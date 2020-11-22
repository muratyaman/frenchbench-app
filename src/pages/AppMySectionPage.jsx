import React from 'react';
import { useParams } from 'react-router-dom';
import { FbMyProfile, FbProtectedMyMenu, Loading, ProtectedLayout } from '../components';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { I18N_KEYS } from '../utils/i18n';

export function AppMySectionPage({ api, i18n }) {
  const { section = 'home', tag = null, slug = null, articleId = null } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const myMenuProps = { section, api, currentUserState, i18n, tag, slug, articleId };
  return (
    <ProtectedLayout title='Home page' currentUserState={currentUserState} i18n={i18n}>
      {!isMounted && <Loading content={i18n._(I18N_KEYS.common_loading) + ' ...'} />}
      {isMounted && <>
        <FbMyProfile currentUserState={currentUserState} i18n={i18n} />
        <FbProtectedMyMenu {...myMenuProps} />
      </>}
    </ProtectedLayout>
  );
}
