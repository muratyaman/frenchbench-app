import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbPostSearch } from '../posts/FbPostSearch';

export function AppPostsPage({ appConfig, api, i18n }) {
  const layoutProps = { appConfig, title: 'Home' };
  const myMenuProps = { activeItem: 'posts', api, i18n };
  const searchProps = { api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <FbPostSearch {...searchProps} />
    </ProtectedLayout>
  );
}
