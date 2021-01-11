import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeRoutes } from './makeRoutes.js';
import { FbApiContext, FbI18nContext } from './contexts';
import { FbCurrentUserContextProvider } from './users/FbCurrentUserContext.jsx';

export function App(props) {
  const api = useContext(FbApiContext);
  const { i18n } = useContext(FbI18nContext);
  const routes = makeRoutes();
  const { appConfig, ssr = false, hydrating = false, initialState = {}, pageProps = {} } = props;
  return (
    <FbCurrentUserContextProvider api={api}>
      <Switch>
        {routes.map((route, idx) => {
          let newRoute = { ...route, component: null };
          newRoute.render = renderProps => {
            const newRenderProps = { ...renderProps, ...pageProps, appConfig, api, i18n, ssr, hydrating, initialState };
            return (<route.component {...newRenderProps} />);
          };
          return (<Route key={idx} {...newRoute} />);
        })}
      </Switch>
    </FbCurrentUserContextProvider>
  );
}
