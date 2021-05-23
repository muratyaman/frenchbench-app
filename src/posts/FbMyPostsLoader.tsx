import { FbLoadingParagraph } from '../components';
import { FbPostSummaryList } from './FbPostSummaryList';
import { usePostsOfUser } from '../hooks/usePostsOfUser';

export function FbMyPostsLoader({ api, currentUserState = null }) {
  const { data: user = null } = currentUserState ?? {};
  const { id: user_id = null } = user ?? {};
  const with_assets = true;
  const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, user_id, with_assets);
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostSummaryList posts={posts} />}
    </div>
  );
}
