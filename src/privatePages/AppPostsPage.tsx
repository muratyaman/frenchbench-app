import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbPostSearch } from '../posts/FbPostSearch';

export function AppPostsPage({ appConfig, api, i18n }) {
  const layoutProps = { appConfig, title: 'Posts', containerClassName: 'fb-page-app-posts' };
  const myMenuProps = { activeItem: 'posts', api, i18n };
  const searchProps = { api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbPostSearch {...searchProps} />
      </div>
    </ProtectedLayout>
  );
}
