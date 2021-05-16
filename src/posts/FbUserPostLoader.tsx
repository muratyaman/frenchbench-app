import { FbLoadingParagraph } from '../components';
import { FbPostDetails } from './FbPostDetails';
import { usePostByUserAndRef } from '../hooks/usePostByUserAndRef';

export function FbUserPostLoader({ api, username, slug }) {
  const { data: post = null, loading = false, error = null } = usePostByUserAndRef(api, { username, slug, with_assets: true });
  return (
    <div className='fb-post-details'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading post</p>}
      { post && <FbPostDetails post={post} username={username} />}
    </div>
  );
}
