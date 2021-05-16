import { FC, PropsWithChildren, useContext } from 'react';
import { FbLink } from '../components';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbMyPostsLoader } from '../posts/FbMyPostsLoader';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

export type AppMyPostsPageProps = AppPageProps;

export const AppMyPostsPage: FC<AppMyPostsPageProps> = (props: PropsWithChildren<AppMyPostsPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const layoutProps = { appConfig, title: 'My Posts', activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'posts', api, currentUserState, i18n };
  const myPostsProps = { api, currentUserState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <p>
          <FbLink to='/app/my/new-post'><span>NEW POST</span></FbLink>
        </p>
        <FbMyPostsLoader {...myPostsProps} />
      </div>
    </ProtectedLayout>
  );
}
