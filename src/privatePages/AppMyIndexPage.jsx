import React, { useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbLoadMyUserProfile } from '../users/FbLoadMyUserProfile';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyIndexPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Profile', activeItemOfTopMenu: 'my' };
  const profileProps = { api, currentUserState };
  const myMenuProps = { activeItem: 'home', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadMyUserProfile {...profileProps} />
    </ProtectedLayout>
  );
}
