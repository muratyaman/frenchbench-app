import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserAdverts } from '../adverts/FbLoadUserAdverts';
import { useUser } from '../hooks/useUser';

export function AppUserAdvertsPage({ appConfig, api, i18n }) {
  const { username } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'Adverts', i18n };
  const userMenuProps = { username, activeItem: 'adverts', api, userState, i18n };
  const advertProps = { username, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbLoadUserAdverts {...advertProps} />
      </div>
    </ProtectedLayout>
  );
}
