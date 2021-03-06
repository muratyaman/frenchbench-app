import { FC, PropsWithChildren, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeRoutes } from './makeRoutes';
import { FbApiContext, FbI18nContext } from './contexts';
import { FbCurrentUserContextProvider } from './users/FbCurrentUserContext';
import { FbWebSocketContextProvider } from './webSockets';
import { FbGeoLocationContextProvider, FbGeoLocationTracker } from './geoLocation';

export interface AppProps {
  appConfig: any;
  ssr: boolean;
  hydrating: boolean;
  initialState?: any;
  pageProps?: any;
}

export const App: FC<AppProps> = (props: PropsWithChildren<AppProps>) => {
  const { api } = useContext(FbApiContext);
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
