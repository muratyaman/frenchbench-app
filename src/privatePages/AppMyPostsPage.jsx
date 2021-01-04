import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyPosts } from '../posts/FbLoadMyPosts';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppMyPostsPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'My Posts', currentUserState, activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n };
  const myPostsProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadMyPosts {...myPostsProps} />
    </ProtectedLayout>
  );
}
