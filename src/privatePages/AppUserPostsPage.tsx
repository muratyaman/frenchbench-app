import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserPosts } from '../posts/FbLoadUserPosts';
import { useUser } from '../hooks/useUser';

export function AppUserPostsPage({ appConfig, api, i18n }) {
  const { username } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'Posts', i18n };
  const userMenuProps = { username, activeItem: 'posts', api, userState, i18n };
  const postsProps = { username, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbLoadUserPosts {...postsProps} />
      </div>
    </ProtectedLayout>
  );
}
