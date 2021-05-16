import { FC, PropsWithChildren, useContext } from 'react';
import { FbGeoLocationContext } from '../geoLocation';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbMyNewPostLoader } from '../posts/FbMyNewPostLoader';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

export type AppMyNewPostPageProps = AppPageProps;

export const AppMyNewPostPage: FC<AppMyNewPostPageProps> = (props: PropsWithChildren<AppMyNewPostPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const { location = null } = useContext(FbGeoLocationContext);
  const layoutProps = { appConfig, title: 'My New Post', currentUserState, activeItemOfTopMenu: 'my-new-post' };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n, location };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbMyNewPostLoader {...myMenuProps} />
      </div>
    </ProtectedLayout>
  );
}
