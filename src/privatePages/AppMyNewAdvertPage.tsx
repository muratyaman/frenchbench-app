import { useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyNewAdvert } from '../adverts/FbLoadMyNewAdvert';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyNewAdvertPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'Home', activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'adverts', currentUserState, api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbLoadMyNewAdvert {...myMenuProps} />
      </div>
    </ProtectedLayout>
  );
}
