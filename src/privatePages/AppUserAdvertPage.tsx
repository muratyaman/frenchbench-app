import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbUserAdvertLoader } from '../adverts/FbUserAdvertLoader';
import { useUser } from '../hooks/useUser';
import { AppPageProps } from '../types';

export type AppUserAdvertPageProps = AppPageProps;

export const AppUserAdvertPage: FC<AppUserAdvertPageProps> = (props: PropsWithChildren<AppUserAdvertPageProps>) => {
  const { appConfig, api, i18n } = props;
  const { username, slug } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'Adverts', i18n };
  const userMenuProps = { username, activeItem: 'adverts', api, userState, i18n };
  const advertProps = { username, slug, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbUserAdvertLoader {...advertProps} />
      </div>
    </ProtectedLayout>
  );
}
