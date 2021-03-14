import React, { useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbLoadArticles } from '../articles/FbLoadArticles';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyArticlesPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'Articles', i18n, activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'articles', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbLoadArticles {...myMenuProps} />
      </div>
    </ProtectedLayout>
  );
}
