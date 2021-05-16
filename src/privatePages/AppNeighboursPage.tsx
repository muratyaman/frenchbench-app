import { FC, PropsWithChildren, useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbChatWithNeighbours } from '../neighbours/FbChatWithNeighbours';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

export type AppNeighboursPageProps = AppPageProps;

export const AppNeighboursPage: FC<AppNeighboursPageProps> = (props: PropsWithChildren<AppNeighboursPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Neighbours' };
  const myMenuProps = { activeItem: 'neighbours', api, currentUserState, i18n };
  const chatProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbChatWithNeighbours {...chatProps} />
      </div>
    </ProtectedLayout>
  );
}
