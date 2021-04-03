import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserProfile } from '../users/FbLoadUserProfile';
import { useUser } from '../hooks/useUser';

export function AppUserIndexPage({ appConfig, api, i18n }) {
  const { username } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'User Profile', i18n };
  const userMenuProps = { username, activeItem: 'home', api, userState, i18n };
  const profileProps = { username, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbLoadUserProfile {...profileProps} />
      </div>
    </ProtectedLayout>
  );
}
