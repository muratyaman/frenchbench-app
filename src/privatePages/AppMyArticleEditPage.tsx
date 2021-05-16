import { FC, PropsWithChildren, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbArticleEditorLoader } from '../articles/FbArticleEditorLoader';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

export type AppMyArticleEditPageProps = AppPageProps;

export const AppMyArticleEditPage: FC<AppMyArticleEditPageProps> = (props: PropsWithChildren<AppMyArticleEditPageProps>) => {
  const { appConfig, api, i18n } = props;
  const currentUserState = useContext(FbCurrentUserContext);
  const { articleId = '' } = useParams();
  const layoutProps = { appConfig, title: 'Articles', i18n, activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'articles', api, currentUserState, i18n };
  const myEditorProps = { api, currentUserState, i18n, articleId };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbArticleEditorLoader {...myEditorProps} />
      </div>
    </ProtectedLayout>
  );
}
