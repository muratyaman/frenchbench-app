import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbUserProfileLoader } from '../users/FbUserProfileLoader';
import { useUser } from '../hooks/useUser';
import { AppPageProps } from '../types';

export type AppUserIndexPageProps = AppPageProps;

export const AppUserIndexPage: FC<AppUserIndexPageProps> = (props: PropsWithChildren<AppUserIndexPageProps>) => {
  const { appConfig, api, i18n } = props;
  const { username } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'User Profile', i18n };
  const userMenuProps = { username, activeItem: 'home', api, userState, i18n };
  const profileProps = { username, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbUserProfileLoader {...profileProps} />
      </div>
    </ProtectedLayout>
  );
}
