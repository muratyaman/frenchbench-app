import { FC, PropsWithChildren, useContext } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbArticlesLoader } from '../articles/FbArticlesLoader';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

export type AppMyArticlesPageProps = AppPageProps;

export const AppMyArticlesPage: FC<AppMyArticlesPageProps> = (props: PropsWithChildren<AppMyArticlesPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'Articles', i18n, activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'articles', api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbArticlesLoader {...myMenuProps} />
      </div>
    </ProtectedLayout>
  );
}
