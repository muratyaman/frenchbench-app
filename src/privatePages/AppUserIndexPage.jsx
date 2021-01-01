import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbProtectedUserMenu, Loading } from '../components';
import { FbSectionUserHome } from '../sections/FbSectionUserHome';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';

export function AppUserIndexPage({ appConfig, api, i18n }) {
  const { username } = useParams();
  const section = 'home';
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Home', currentUserState, i18n };
  const userMenuProps = { username, section, api, userState, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbProtectedUserMenu {...userMenuProps} />
      <FbSectionUserHome {...userMenuProps} />
    </ProtectedLayout>
  );
}
