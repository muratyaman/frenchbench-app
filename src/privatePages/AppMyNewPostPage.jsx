import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyNewPost } from '../posts/FbLoadMyNewPost';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppMyNewPostPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'My New Post', currentUserState, activeItemOfTopMenu: 'my-new-post' };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadMyNewPost {...myMenuProps} />
    </ProtectedLayout>
  );
}
