import React from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { Loading } from '../components';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbChatWithNeighbours } from '../neighbours/FbChatWithNeighbours';
import { useMounted } from '../hooks/useMounted';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function AppNeighboursPage({ appConfig, api, i18n }) {
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  
  if (!isMounted) return (<Loading content={i18n.common_loading()} />);
  
  const layoutProps = { appConfig, title: 'Neighbours', currentUserState };
  const myMenuProps = { activeItem: 'neighbours', api, currentUserState, i18n };
  const chatProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <FbChatWithNeighbours {...chatProps} />
    </ProtectedLayout>
  );
}
