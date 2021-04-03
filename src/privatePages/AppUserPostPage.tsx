import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserPost } from '../posts/FbLoadUserPost';
import { useUser } from '../hooks/useUser';

export function AppUserPostPage({ appConfig, api, i18n }) {
  const { username, slug } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'User Post', i18n };
  const userMenuProps = { username, activeItem: 'posts', api, userState, i18n };
  const postProps = { username, slug, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <div className='fb-content'>
        <FbLoadUserPost {...postProps} />
      </div>
    </ProtectedLayout>
  );
}
