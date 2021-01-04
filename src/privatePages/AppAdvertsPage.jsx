import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAdvertSearch } from '../adverts/FbAdvertSearch';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { FbAppMenu } from '../menus/FbAppMenu';

export function AppAdvertsPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'Adverts', currentUserState };
  const myMenuProps = { activeItem: 'adverts', api, currentUserState, i18n };
  const searchProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <FbAdvertSearch {...searchProps} />
    </ProtectedLayout>
  );
}
