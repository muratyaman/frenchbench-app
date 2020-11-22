import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { appConfig } from './appConfig';
// for now, include all CSS here; SSR does not work with CSS imported by a component
import 'semantic-ui-css/semantic.min.css';
import 'react-mde/lib/styles/css/react-mde-all.css';
import './styles/index.css';

const initialState = window.__INITIAL_STATE__ || {};
delete window.__INITIAL_STATE__;

console.log('process.env', process.env);

const appProps = { localeCode: 'en', appConfig, initialState, pageProps: {}, ssr: false };

const rootElement = document.getElementById('root');
if (rootElement) {
  if (rootElement.hasChildNodes()) {
    // HTML has server-side rendered code. hydrate() faster than render()
    console.info('client-side hydrate due to SSR');
    appProps.hydrating = true;
    ReactDOM.hydrate(<React.StrictMode><BrowserRouter><App {...appProps} /></BrowserRouter></React.StrictMode>, rootElement);
  } else {
    // pure client-side rendering
    console.info('client-side render');
    ReactDOM.render(<React.StrictMode><BrowserRouter><App {...appProps} /></BrowserRouter></React.StrictMode>, rootElement);
  }
} else {
  console.error('root element not found');
}
