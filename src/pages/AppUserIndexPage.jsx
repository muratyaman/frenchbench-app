import React from 'react';
import { useParams } from 'react-router-dom';
import { FbProtectedUserMenu, Loading, ProtectedLayout } from '../components';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';
import { I18N_KEYS } from '../utils/i18n';

export function AppUserIndexPage({ appConfig, api, i18n }) {
  const { username } = useParams();
  const section = 'home';
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });
  const userMenuProps = { username, section, api, userState, currentUserState, i18n };

  if (!isMounted) return (<Loading content={i18n._(I18N_KEYS.common_loading) + ' ...'} />);

  const layoutProps = { appConfig, title: 'Home', currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbProtectedUserMenu {...userMenuProps} />
    </ProtectedLayout>
  );
}
