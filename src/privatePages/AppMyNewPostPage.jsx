import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbSectionMyNewPost } from '../sections/FbSectionMyNewPost';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppMyNewPostPage({ appConfig, api, i18n }) {
  const { section = 'home', tag = null, slug = null, articleId = null } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'Home', currentUserState };
  const myMenuProps = { appConfig, section, api, currentUserState, i18n, tag, slug, articleId };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbSectionMyNewPost {...myMenuProps} />
    </ProtectedLayout>
  );
}
