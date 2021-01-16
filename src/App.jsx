import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeRoutes } from './makeRoutes.js';
import { FbApiContext, FbI18nContext } from './contexts';
import { FbCurrentUserContextProvider } from './users/FbCurrentUserContext.jsx';
import { FbWebSocketContextProvider } from './webSockets/index.js';
import { FbGeoLocationContextProvider, FbGeoLocationTracker } from './geoLocation/index.js';

export function App(props) {
  const api = useContext(FbApiContext);
  const { i18n } = useContext(FbI18nContext);
  const routes = makeRoutes();
  const { appConfig, ssr = false, hydrating = false, initialState = {}, pageProps = {} } = props;
  const routerSwitch = (
    <Switch>
      {routes.map((route, idx) => {
        let newRoute = { ...route, component: null };
        const newRenderProps = { ...pageProps, appConfig, api, i18n, ssr, hydrating, initialState };
        return (
          <Route key={idx} {...newRoute}>
            <route.component {...newRenderProps} />
          </Route>
        );
      })}
    </Switch>
  );
  return (
    <FbCurrentUserContextProvider api={api}>
      <FbWebSocketContextProvider url={appConfig.ws.fullUrl}>
        <FbGeoLocationContextProvider>
          {routerSwitch}
          <FbGeoLocationTracker />
        </FbGeoLocationContextProvider>
      </FbWebSocketContextProvider>
    </FbCurrentUserContextProvider>
  );
}
