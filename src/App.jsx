import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { newI18N } from './lib/i18n';
import { apiClient } from './lib/apiClient';
import { makeRoutes } from './makeRoutes.js';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state  = {};
    this.api    = apiClient({ ...props.appConfig.api });
    this.routes = makeRoutes();
  }

  render() {
    const { localeCode = 'en', ssr = false, hydrating = false, initialState = {}, pageProps = {} } = this.props;
    console.log('App', this.props);
    const i18n = newI18N(localeCode);
    const { api, routes } = this;
    return (
      <Switch>
        {routes.map((route, idx) => {
          let newRoute = { ...route, component: null };
          newRoute.render = renderProps => {
            const newRenderProps = { ...renderProps, ...pageProps, api, i18n, ssr, hydrating, initialState };
            return (<route.component {...newRenderProps} />);
          };
          return (<Route key={idx} {...newRoute} />);
        })}
      </Switch>
    );
  }
}
