import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbUserAdvertsLoader } from '../adverts/FbUserAdvertsLoader';
import { useUser } from '../hooks/useUser';
import { AppPageProps } from '../types';

export type AppUserAdvertsPageProps = AppPageProps;

export const AppUserAdvertsPage: FC<AppUserAdvertsPageProps> = (props: PropsWithChildren<AppUserAdvertsPageProps>) => {
  const { appConfig, api, i18n } = props;
  const { username } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'Adverts', i18n };
  const userMenuProps = { username, activeItem: 'adverts', api, userState, i18n };
  const advertProps = { username, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbUserAdvertsLoader {...advertProps} />
      </div>
    </ProtectedLayout>
  );
}
