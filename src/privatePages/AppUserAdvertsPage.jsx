import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserAdverts } from '../adverts/FbLoadUserAdverts';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';

export function AppUserAdvertsPage({ appConfig, api, i18n }) {
  const { username } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Adverts', currentUserState, i18n };
  const userMenuProps = { username, activeItem: 'adverts', api, userState, currentUserState, i18n };
  const advertProps = { username, api, userState, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <FbLoadUserAdverts {...advertProps} />
    </ProtectedLayout>
  );
}
