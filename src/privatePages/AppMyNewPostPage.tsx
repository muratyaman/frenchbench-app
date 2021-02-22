import React, { useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyNewPost } from '../posts/FbLoadMyNewPost';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyNewPostPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My New Post', currentUserState, activeItemOfTopMenu: 'my-new-post' };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadMyNewPost {...myMenuProps} />
    </ProtectedLayout>
  );
}
