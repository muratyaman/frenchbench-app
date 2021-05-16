import './config';
import express, { Request, Response } from 'express';
//import morgan from 'morgan'; // TODO
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { newAppConfig } from '../src/appConfig';
import { ApiClient, ApiResponse, ArticleDetailsModel } from '../src/utils/apiClient';
import { defaultLocaleCode } from '../src/utils/i18n';
import { App } from '../src/App';
import { FbApiContextProvider, FbI18nContextProvider } from '../src/contexts';
import { makeRoutes } from '../src/makeRoutes.js';

console.log('FrenchBench API starting...');

const indexHtmlPath = path.join(__dirname, '..', 'build', 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const serverConfig = {
  title: 'FrenchBench',
  version: '1.5.0',
  http: {
    port: parseInt(process.env.HTTP_PORT || '3000'),
  },
  api: {
    host: process.env.API_HOST || 'http://127.0.0.1:12000',
    baseUrl: process.env.API_BASE_URL || '/api',
  },
  cdnUrl: process.env.REACT_APP_CDN || '/',
};

const ssr    = true;
const api    = new ApiClient(serverConfig.api);
const routes = makeRoutes(); // react app routes, not express server

const server = express();

// hide powered by express
server.disable('x-powered-by');

// create a write stream (in append mode)
//const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), { flags: 'a' })

// setup the logger
//server.use(morgan('combined', { stream: accessLogStream }));

// Nginx replacement - START
console.log('proxy middleware ...');
const apiProxy = createProxyMiddleware({ target: serverConfig.api.host, changeOrigin: true, ws: true });
server.use(serverConfig.api.baseUrl, apiProxy);
console.log('proxy middleware ... ready');
// Nginx replacement - END ===================================================

server.get('/app', noSsr);

// SSR
server.get('/info/article/:slug', sendPage);
server.get('/info/:page', sendPage);
server.get('/info', sendPage);
server.get('/', sendPage);

// server.get('*', noSsr);
// TODO: turn off, this will be served by Nginx
console.log('serve static folder: build ...');
server.use(express.static(path.join(__dirname, '..', 'build')));
console.log('serve static folder: build ... ready');

server.listen(serverConfig.http.port, () => {
  console.log('server listening on http://localhost:', serverConfig.http.port, '...ready!');
});

function noSsr(req, res) {
  res.sendFile(indexHtmlPath);
}

async function sendPage(req, res) { // server-side rendering of all pages
  console.log(new Date().toISOString(), 'req.path', req.path);

  try {
    const staticRouterProps = {
      location: req.url,
      context: {},
    };

    const appConfig = newAppConfig(process.env);
    const localeCode = defaultLocaleCode(); // TODO: detect locale code
    
    const ssrDataProvider = makeSsrDataProvider();
    
    const { initialState, content } = await ssrHtml({
      req, res, staticRouterProps, routes, appConfig, api, localeCode, ssrDataProvider,
    });

    const initialStateJson = JSON.stringify(initialState);
    const find1 = `</head>`;
    const replace1 = `<script>/* SSR */ window.__INITIAL_STATE__=${initialStateJson}</script></head>`;

    const find2 = '<div id="root"></div>';
    const replace2 = `<div id="root">${content}</div><!-- SSR -->`;
    const html = indexHtml.toString().replace(find1, replace1).replace(find2, replace2);

    // TODO: consider dealing with instances of <Redirect /> via context{}

    res.setHeader('Cache-Control', 'assets, max-age=604800');
    res.send(html);
  } catch (err) {
    console.error('sendPage error', err);
    noSsr(req, res);
  }
}

async function ssrHtml({
  req, res, staticRouterProps, routes, appConfig, api, localeCode, ssrDataProvider,
}) {
  // handling server-side request
  const { path } = req;
  let matchedPage = null;
  let func = async (args: any) => Promise.resolve({});

  // imitate `<Switch>` behaviour of selecting only the first to match
  for (const route of routes) {
    const match = matchPath(path, route);
    if (match) {
      const { ssr = ''} = route;
      console.log('path route, match, ssr', path, route, match, ssr);
      if (ssr && (ssr !== '') && ssrDataProvider[ssr]) {
        func = ssrDataProvider[ssr];
        matchedPage = ssr;
      }
      break;
    }
  }

  const pageProps = await func({ req, res, api });

  const initialState = { // index.js of app will pick it up
    [matchedPage]: pageProps,
    matchedPage,
    ssr,
  };
  const appProps = { appConfig, localeCode, pageProps, ssr, hydrating: false, initialState };

  const content = ReactDOMServer.renderToString(
    <React.StrictMode>
      <FbApiContextProvider apiConfig={appConfig.api} api={api}>
        <FbI18nContextProvider localeCode={localeCode}>
          <StaticRouter {...staticRouterProps}>
            <App {...appProps} />
          </StaticRouter>
        </FbI18nContextProvider>
      </FbApiContextProvider>
    </React.StrictMode>
  );
  return { content, initialState };
}

interface SsrInput {
  req: Request;
  res: Response;
  api: ApiClient;
}
interface SsrData<TData> {
  ssrData: ApiResponse<TData>;
}

interface SsrDataProviderFn<TSsrData> {
  (input: SsrInput): Promise<SsrData<TSsrData>>;
}
interface SsrDataProvider {
  IndexPage: SsrDataProviderFn<ArticleDetailsModel>;
  InfoArticlePage: SsrDataProviderFn<ArticleDetailsModel>;
}

function makeSsrDataProvider(): SsrDataProvider {

  const IndexPage: SsrDataProviderFn<ArticleDetailsModel> = async ({ req, api }: SsrInput) => {
    console.log('IndexPage SSR', req.path);
    const slug = 'home';
    let ssrData = { slug, data: null, error: null };
    try {
      const output = await api.article_retrieve({ slug });
      ssrData = { ...ssrData, ...output };
    } catch (err) {
      ssrData.error = err.message;
    }
    return { ssrData };
  };

  const InfoArticlePage: SsrDataProviderFn<ArticleDetailsModel> = async ({ req, api }: SsrInput) => {
    console.log('InfoArticlePage SSR', req.path);
    const { slug = null } = req.params;
    let ssrData = { slug, data: null, error: null };
    if (slug) {
      try {
        const output = await api.article_retrieve({ slug });
        ssrData = { ...ssrData, ...output };
      } catch (err) {
        ssrData.error = err.message;
      }
    }
    return { ssrData };
  };
  
  return {
    IndexPage,
    InfoArticlePage,
  };
}
