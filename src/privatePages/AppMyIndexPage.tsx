import { FC, PropsWithChildren, useContext } from 'react';
import { Label } from 'semantic-ui-react';
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
        <hr />
        <p>
          <FbLink to='/app/my/new-post'><Label color='purple'>NEW POST</Label></FbLink>{' '}
          <FbLink to='/app/my/new-advert'><Label color='yellow'>NEW ADVERT</Label></FbLink>
        </p>
      </div>
    </ProtectedLayout>
  );
}
