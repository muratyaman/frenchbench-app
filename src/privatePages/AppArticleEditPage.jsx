import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbSectionArticleEdit } from '../sections/FbSectionArticleEdit';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppArticleEditPage({ appConfig, api, i18n }) {
  const { section = 'search', tag = '' } = useParams();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Posts', currentUserState, i18n };
  const myMenuProps = { section, tag, api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbSectionArticleEdit {...myMenuProps} />
    </ProtectedLayout>
  );
}
