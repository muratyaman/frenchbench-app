import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbLoadMyUserProfile } from '../users/FbLoadMyUserProfile';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppMyIndexPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'My Profile', currentUserState, activeItemOfTopMenu: 'my' };
  const profileProps = { api, currentUserState };
  const myMenuProps = { activeItem: 'home', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadMyUserProfile {...profileProps} />
    </ProtectedLayout>
  );
}
