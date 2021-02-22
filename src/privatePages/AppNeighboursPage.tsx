import React, { useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbChatWithNeighbours } from '../neighbours/FbChatWithNeighbours';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppNeighboursPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'Neighbours' };
  const myMenuProps = { activeItem: 'neighbours', api, currentUserState, i18n };
  const chatProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <FbChatWithNeighbours {...chatProps} />
    </ProtectedLayout>
  );
}
