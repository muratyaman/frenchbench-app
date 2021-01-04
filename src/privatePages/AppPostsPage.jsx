import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbPostSearch } from '../posts/FbPostSearch';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppPostsPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'Home', currentUserState };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n };
  const searchProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <FbPostSearch {...searchProps} />
    </ProtectedLayout>
  );
}
