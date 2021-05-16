import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbUserPostsLoader } from '../posts/FbUserPostsLoader';
import { useUser } from '../hooks/useUser';
import { AppPageProps } from '../types';

export type AppUserPostsPageProps = AppPageProps;

export const AppUserPostsPage: FC<AppUserPostsPageProps> = (props: PropsWithChildren<AppUserPostsPageProps>) => {
  const { appConfig, api, i18n } = props;
  const { username } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'User Posts', i18n };
  const userMenuProps = { username, activeItem: 'posts', api, userState, i18n };
  const postsProps = { username, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbUserPostsLoader {...postsProps} />
      </div>
    </ProtectedLayout>
  );
}
