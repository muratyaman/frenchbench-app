import { FC, PropsWithChildren, useContext } from 'react';
import { FbLink } from '../components';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbMyAdvertsLoader } from '../adverts/FbMyAdvertsLoader';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

export type AppMyAdvertsPageProps = AppPageProps;

export const AppMyAdvertsPage: FC<AppMyAdvertsPageProps> = (props: PropsWithChildren<AppMyAdvertsPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Adverts', activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'adverts', api, currentUserState, i18n };
  const myAdvertsProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <p>
          <FbLink to='/app/my/new-advert'><span>NEW ADVERT</span></FbLink>
        </p>
        <FbMyAdvertsLoader {...myAdvertsProps} />
      </div>
    </ProtectedLayout>
  );
}
