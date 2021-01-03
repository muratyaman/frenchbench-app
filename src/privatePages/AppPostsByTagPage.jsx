import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbLoadPostsByTag } from '../posts/FbLoadPostsByTag';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppPostsByTagPage({ appConfig, api, i18n }) {
  const { tag = '' } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Posts', currentUserState, i18n };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n };
  const postsProps = { tag, api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <FbLoadPostsByTag {...postsProps} />
    </ProtectedLayout>
  );
}
