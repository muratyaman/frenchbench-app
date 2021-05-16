import { FbLoadingParagraph } from '../components';
import { FbPostList } from './FbPostList';
import { usePostsOfUser } from '../hooks/usePostsOfUser';

export function FbUserPostsLoader({ api, username }) {
  const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, { username, with_assets: true });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostList posts={posts} />}
    </div>
  );
}
