import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbProtectedMyMenu, Loading } from '../components';
import { FbMyProfile } from '../users/FbMyProfile';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppMySectionPostsByTagPage({ appConfig, api, i18n }) {
  const { section = 'search', tag = '' } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const myMenuProps = { section, tag, api, currentUserState, i18n };

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Posts', currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbMyProfile currentUserState={currentUserState} i18n={i18n} />
      <FbProtectedMyMenu {...myMenuProps} />
    </ProtectedLayout>
  );
}
