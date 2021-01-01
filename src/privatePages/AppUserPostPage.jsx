import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbProtectedUserMenu, Loading } from '../components';
import { FbSectionUserPost } from '../sections/FbSectionUserPost';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';

export function AppUserPostPage({ appConfig, api, i18n }) {
  const { username, post_ref } = useParams();
  const section = 'posts';
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Post', currentUserState, i18n };
  const userMenuProps = { username, post_ref, section, api, currentUserState, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbProtectedUserMenu {...userMenuProps} />
      <FbSectionUserPost {...userMenuProps} />
    </ProtectedLayout>
  );
}
