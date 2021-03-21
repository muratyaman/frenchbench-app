import { useContext } from 'react';
import { FbLink } from '../components';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbLoadMyUserProfile } from '../users/FbLoadMyUserProfile';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyIndexPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Profile', activeItemOfTopMenu: 'my' };
  const profileProps = { api, currentUserState };
  const myMenuProps = { activeItem: 'home', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbLoadMyUserProfile {...profileProps} />
        <p>
          <FbLink to='/app/my/new-post'><span>NEW POST</span></FbLink>{' '}
          <FbLink to='/app/my/new-advert'><span>NEW ADVERT</span></FbLink>
        </p>
      </div>
    </ProtectedLayout>
  );
}
