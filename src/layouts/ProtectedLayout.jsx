import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { Loading } from '../components';
import { FbI18nContext } from '../contexts';
import { FbWebSocketContextProvider } from '../webSockets';
import { FbGeoLocationContextProvider, FbGeoLocationTracker } from '../geoLocation';
import { FbAppTopMenu } from '../menus/FbAppTopMenu';

// fixed menu at top. rendered only on client-side
export function ProtectedLayout(props) {
  const { i18n } = useContext(FbI18nContext);
  const { appConfig, title = '', currentUserState = null, containerClassName = 'fb-page', activeItemOfTopMenu = 'home', children } = props;
  const { data: user = null, loading = false, error: userError = null } = currentUserState ?? {};
  const menuProps = { activeItem: activeItemOfTopMenu, currentUserState, i18n };
  return (
    <FbWebSocketContextProvider url={appConfig.ws.fullUrl}>
      <FbGeoLocationContextProvider>
        
        <Helmet>
          <title>{title} - FrenchBench</title>
        </Helmet>
        
        <FbAppTopMenu {...menuProps} />

        <div className={containerClassName}>
          {loading && <Loading content={i18n.common_loading()} />}
          {userError && <p>{i18n.common_please_sign_in()}</p>}
          {user && children}
        </div>
        
        <FbGeoLocationTracker />

      </FbGeoLocationContextProvider>
    </FbWebSocketContextProvider>
  );

}
