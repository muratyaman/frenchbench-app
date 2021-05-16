import { FC, PropsWithChildren, useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbMyNewAdvertLoader } from '../adverts/FbMyNewAdvertLoader';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { FbGeoLocationContext } from '../geoLocation';
import { AppPageProps } from '../types';

export type AppMyNewAdvertPageProps = AppPageProps;

export const AppMyNewAdvertPage: FC<AppMyNewAdvertPageProps> = (props: PropsWithChildren<AppMyNewAdvertPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const { location = null } = useContext(FbGeoLocationContext);
  const layoutProps = { appConfig, title: 'My New Advert', activeItemOfTopMenu: 'my-new-advert' };
  const myMenuProps = { activeItem: 'adverts', currentUserState, api, i18n, location };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbMyNewAdvertLoader {...myMenuProps} />
      </div>
    </ProtectedLayout>
  );
}
