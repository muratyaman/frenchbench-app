import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserPost } from '../posts/FbLoadUserPost';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useUser } from '../hooks/useUser';

export function AppUserPostPage({ appConfig, api, i18n }) {
  const { username, post_ref } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Post', currentUserState, i18n };
  const userMenuProps = { username, activeItem: 'posts', api, currentUserState, userState, i18n };
  const postProps = { username, post_ref, api, currentUserState, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <FbLoadUserPost {...postProps} />
    </ProtectedLayout>
  );
}
