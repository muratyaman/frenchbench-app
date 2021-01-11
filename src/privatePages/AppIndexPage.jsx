import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';

export function AppIndexPage({ appConfig, api, i18n }) {  
  const layoutProps = { appConfig, title: 'Home' };
  const myMenuProps = { activeItem: 'home', api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div>
        TODO: display all events happenning around me
      </div>
    </ProtectedLayout>
  );
}
