import { useContext } from 'react';
import { FbLink } from '../components';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyAdverts } from '../adverts/FbLoadMyAdverts';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyAdvertsPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Adverts', activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'adverts', api, currentUserState, i18n };
  const myAdvertsProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <p>
          <FbLink to='/app/my/new-advert'><span>NEW ADVERT</span></FbLink>
        </p>
        <FbLoadMyAdverts {...myAdvertsProps} />
      </div>
    </ProtectedLayout>
  );
}
