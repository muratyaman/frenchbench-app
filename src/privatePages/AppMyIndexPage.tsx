import { FC, PropsWithChildren, useContext } from 'react';
import { FbLink } from '../components';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbMyUserProfileLoader } from '../users/FbMyUserProfileLoader';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

export type AppMyIndexPageProps = AppPageProps;

export const AppMyIndexPage: FC<AppMyIndexPageProps> = (props: PropsWithChildren<AppMyIndexPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Profile', activeItemOfTopMenu: 'my' };
  const profileProps = { api, currentUserState };
  const myMenuProps = { activeItem: 'home', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbMyUserProfileLoader {...profileProps} />
        <p>
          <FbLink to='/app/my/new-post'><span>NEW POST</span></FbLink>{' '}
          <FbLink to='/app/my/new-advert'><span>NEW ADVERT</span></FbLink>
        </p>
      </div>
    </ProtectedLayout>
  );
}
