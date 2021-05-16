import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbUserPostLoader } from '../posts/FbUserPostLoader';
import { useUser } from '../hooks/useUser';
import { AppPageProps } from '../types';

export type AppUserPostPageProps = AppPageProps;

export const AppUserPostPage: FC<AppUserPostPageProps> = (props: PropsWithChildren<AppUserPostPageProps>) => {
  const { appConfig, api, i18n } = props;
  const { username, slug } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'User Post', i18n };
  const userMenuProps = { username, activeItem: 'posts', api, userState, i18n };
  const postProps = { username, slug, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbUserPostLoader {...postProps} />
      </div>
    </ProtectedLayout>
  );
}
