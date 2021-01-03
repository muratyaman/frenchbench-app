import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { FbFooter } from '../components';
import { FbI18nContext } from '../contexts';
import { FbWebSocketContextProvider } from '../webSockets';
import { FbGeoLocationContextProvider, FbGeoLocationTracker } from '../geoLocation';
import { FbAppTopMenu } from '../menus/FbAppTopMenu';

// fixed menu at top. rendered only on client-side
export function ProtectedLayout(props) {
  const { i18n } = useContext(FbI18nContext);
  const { appConfig, title = '', currentUserState = null, containerClassName = 'fb-page', children } = props;
  const { data: user = null, loading = false, error: userError = null } = currentUserState ?? {};
  const menuProps = { currentUserState, i18n };
  return (
    <FbWebSocketContextProvider url={appConfig.ws.fullUrl}>
      <FbGeoLocationContextProvider>
        
        <Helmet>
          <title>{title} - FrenchBench</title>
        </Helmet>
        
        <FbAppTopMenu {...menuProps} />

        <div className={containerClassName}>
          {userError ? <p>Please sign in</p>: children}
        </div>

        <FbFooter accordion />
        
        <FbGeoLocationTracker />

      </FbGeoLocationContextProvider>
    </FbWebSocketContextProvider>
  );

}
