import React from 'react';
import { useParams } from 'react-router-dom';
import { FbMyProfile, FbProtectedMyMenu, Loading, ProtectedLayout } from '../components';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { I18N_KEYS } from '../lib/i18n';

export function AppMySectionPostsByTagPage({ api, i18n }) {
  const { section = 'search', tag = '' } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const myMenuProps = { section, tag, api, currentUserState, i18n };
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
