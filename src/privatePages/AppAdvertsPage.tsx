import { FC, PropsWithChildren } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAdvertSearch } from '../adverts/FbAdvertSearch';
import { FbAppMenu } from '../menus/FbAppMenu';
import { AppPageProps } from '../types';

export type AppAdvertsPageProps = AppPageProps;

export const AppAdvertsPage: FC<AppAdvertsPageProps> = (props: PropsWithChildren<AppAdvertsPageProps>) => {
  const { appConfig, api, i18n } = props;
  const layoutProps = { appConfig, title: 'Adverts' };
  const myMenuProps = { activeItem: 'adverts', api, i18n };
  const searchProps = { api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbAdvertSearch {...searchProps} />
      </div>
    </ProtectedLayout>
  );
}
