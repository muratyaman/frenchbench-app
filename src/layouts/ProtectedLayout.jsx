import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { FbClientSideContainer, Loading } from '../components';
import { FbI18nContext } from '../contexts';
import { FbWebSocketContextProvider } from '../webSockets';
import { FbGeoLocationContextProvider, FbGeoLocationTracker } from '../geoLocation';
import { FbAppTopMenu } from '../menus/FbAppTopMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

// fixed menu at top. rendered only on client-side
export function ProtectedLayout(props) {
  const currentUserState = useContext(FbCurrentUserContext);
  const { i18n } = useContext(FbI18nContext);
  const { appConfig, title = '', containerClassName = 'fb-page', activeItemOfTopMenu = 'home', children } = props;
  const { data: user = null, loading = false, error: userError = null } = currentUserState ?? {};
  const menuProps = { activeItem: activeItemOfTopMenu, currentUserState, i18n };
  return (
    <FbClientSideContainer>
      <FbWebSocketContextProvider url={appConfig.ws.fullUrl}>
        <FbGeoLocationContextProvider>
          
          <Helmet>
            <title>{title} - FrenchBench Communities</title>
          </Helmet>
          
          <FbAppTopMenu {...menuProps} />

          <div className={containerClassName}>
            {loading && <Loading />}
            {!loading && !user && <p>{i18n.common_please_sign_in()}</p>}
            {user && children}
          </div>
          
          {user && <FbGeoLocationTracker />}

        </FbGeoLocationContextProvider>
      </FbWebSocketContextProvider>
    </FbClientSideContainer>
  );

}
