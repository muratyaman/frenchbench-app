import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { Icon, Image, Menu } from 'semantic-ui-react';
import { FbFooter, FbLink, FbLocaleSwitch, FbProfileLink } from '../components';
import { FbI18nContext } from '../contexts';
import { FbWebSocketContextProvider, FbWebSocketStatus } from '../webSockets';
import { FbGeoLocationContextProvider, FbGeoLocationStatus, FbGeoLocationTracker } from '../geoLocation';

// fixed menu at top. rendered only on client-side
export function ProtectedLayout(props) {
  const { i18n } = useContext(FbI18nContext);
  const { appConfig, title = '', currentUserState = null, containerClassName = 'fb-page', children } = props;
  const { data: user = null, loading = false, error: userError = null } = currentUserState ?? {};

  return (
    <FbWebSocketContextProvider url={appConfig.ws.fullUrl}>
      <FbGeoLocationContextProvider>
        <Helmet>
          <title>{title} - FrenchBench</title>
        </Helmet>
        <Menu fixed='top' compact>
          <Menu.Item name='home' className='fb-header-logo'>
            <FbLink to='/'><Image size='mini' src='/assets/frenchbench-logo-mini.png' /></FbLink>
          </Menu.Item>
          {/*<Menu.Item name='i-need-help'>
            <FbLink to='/info/i-need-help'>
              <span aria-label={i18n.common_i_need_help()}>
                <Icon name='heart outline' color='purple' />
              </span>
            </FbLink>
          </Menu.Item>
          <Menu.Item name='i-can-help'>
            <FbLink to='/info/i-can-help'>
              <span aria-label={i18n.common_i_can_help()}>
                <Icon name='heart' color='purple' />
              </span>
            </FbLink>
          </Menu.Item>*/}
          <Menu.Item name='user-profile'>
            <FbProfileLink currentUserState={currentUserState} i18n={i18n} />
          </Menu.Item>
          <Menu.Item name='location'><FbGeoLocationStatus /></Menu.Item>
          <Menu.Item name='websocket'><FbWebSocketStatus /></Menu.Item>
          <Menu.Item>
            <FbLocaleSwitch />
          </Menu.Item>
        </Menu>

        <div className={containerClassName}>
          {userError ? <p>Please sign in</p>: children}
        </div>

        <FbFooter accordion />
        <FbGeoLocationTracker />
      </FbGeoLocationContextProvider>
    </FbWebSocketContextProvider>
  );

}
