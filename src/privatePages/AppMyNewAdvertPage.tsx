import { useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyNewAdvert } from '../adverts/FbLoadMyNewAdvert';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { FbGeoLocationContext } from '../geoLocation';

export function AppMyNewAdvertPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const { location = null } = useContext(FbGeoLocationContext);
  const layoutProps = { appConfig, title: 'My New Advert', activeItemOfTopMenu: 'my-new-advert' };
  const myMenuProps = { activeItem: 'adverts', currentUserState, api, i18n, location };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbLoadMyNewAdvert {...myMenuProps} />
      </div>
    </ProtectedLayout>
  );
}
