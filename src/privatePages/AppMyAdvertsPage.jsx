import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbLoadMyAdverts } from '../adverts/FbLoadMyAdverts';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppMyAdvertsPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'My Adverts', currentUserState, activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'adverts', api, currentUserState, i18n };
  const myAdvertsProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadMyAdverts {...myAdvertsProps} />
    </ProtectedLayout>
  );
}
