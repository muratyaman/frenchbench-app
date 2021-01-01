import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbProtectedUserMenu, Loading } from '../components';
import { FbSectionUserAdvert } from '../sections/FbSectionUserAdvert';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';

export function AppUserAdvertPage({ appConfig, api, i18n }) {
  const { username, advert_ref } = useParams();
  const section = 'adverts';
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Advert', currentUserState, i18n };
  const userMenuProps = { username, advert_ref, section, api, currentUserState, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbProtectedUserMenu {...userMenuProps} />
      <FbSectionUserAdvert {...userMenuProps} />
    </ProtectedLayout>
  );
}
