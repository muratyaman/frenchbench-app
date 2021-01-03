import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserProfile } from '../users/FbLoadUserProfile';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';

export function AppUserIndexPage({ appConfig, api, i18n }) {
  const { username } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Home', currentUserState, i18n };
  const userMenuProps = { username, activeItem: 'home', api, userState, currentUserState, i18n };
  const profileProps = { username, api, userState, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <FbLoadUserProfile {...profileProps} />
    </ProtectedLayout>
  );
}
