import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbLoadPostsByTag } from '../posts/FbLoadPostsByTag';

export function AppPostsByTagPage({ appConfig, api, i18n }) {
  const { tag = '' } = useParams();
  const layoutProps = { appConfig, title: 'Posts', i18n };
  const myMenuProps = { activeItem: 'posts', api, i18n };
  const postsProps = { tag, api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbLoadPostsByTag {...postsProps} />
      </div>
    </ProtectedLayout>
  );
}
