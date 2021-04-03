import React, { useContext } from 'react';
import { FbGeoLocationContext } from '../geoLocation';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyNewPost } from '../posts/FbLoadMyNewPost';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyNewPostPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const { location = null } = useContext(FbGeoLocationContext);
  const layoutProps = { appConfig, title: 'My New Post', currentUserState, activeItemOfTopMenu: 'my-new-post' };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n, location };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbLoadMyNewPost {...myMenuProps} />
      </div>
    </ProtectedLayout>
  );
}
