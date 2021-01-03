import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbLoadArticles } from '../articles/FbLoadArticles';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';

export function AppMyArticlesPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);

  if (!isMounted) return (<Loading content={i18n.common_loading()} />);

  const layoutProps = { appConfig, title: 'Articles', currentUserState, i18n };
  const myMenuProps = { activeItem: 'articles', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadArticles {...myMenuProps} />
    </ProtectedLayout>
  );
}
