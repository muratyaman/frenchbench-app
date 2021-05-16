import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbPostsByTagLoader } from '../posts/FbPostsByTagLoader';
import { AppPageProps } from '../types';

export type AppPostsByTagPageProps = AppPageProps;

export const AppPostsByTagPage: FC<AppPostsByTagPageProps> = (props: PropsWithChildren<AppPostsByTagPageProps>) => {
  const { appConfig, api, i18n } = props;
  const { tag = '' } = useParams();
  const layoutProps = { appConfig, title: 'Posts', i18n };
  const myMenuProps = { activeItem: 'posts', api, i18n };
  const postsProps = { tag, api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbPostsByTagLoader {...postsProps} />
      </div>
    </ProtectedLayout>
  );
}
