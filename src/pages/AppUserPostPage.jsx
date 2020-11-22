import React from 'react';
import { useParams } from 'react-router-dom';
import { FbProtectedUserMenu, Loading, ProtectedLayout } from '../components';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';
import { I18N_KEYS } from '../utils/i18n';

export function AppUserPostPage({ api, i18n }) {
  const { username, post_ref } = useParams();
  const section = 'posts';
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });
  const userMenuProps = {
    username,
    post_ref,
    section,
    api,
    currentUserState,
    userState,
    i18n,
  };
  return (
    <ProtectedLayout title='Home page' currentUserState={currentUserState} i18n={i18n}>
      {!isMounted && <Loading content={i18n._(I18N_KEYS.common_loading) + ' ...'} />}
      {isMounted && <FbProtectedUserMenu {...userMenuProps} />}
    </ProtectedLayout>
  );
}
