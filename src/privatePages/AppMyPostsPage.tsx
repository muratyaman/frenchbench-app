import React, { useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyPosts } from '../posts/FbLoadMyPosts';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyPostsPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Posts', activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n };
  const myPostsProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbLoadMyPosts {...myPostsProps} />
      </div>
    </ProtectedLayout>
  );
}
