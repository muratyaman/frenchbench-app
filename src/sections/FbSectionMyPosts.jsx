import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbPostSummaryList } from '../posts/FbPostSummaryList';
import { usePostsOfUser } from '../hooks/usePostsOfUser';

export function FbSectionMyPosts({ api, currentUserState }) {
  const { data: user = null } = currentUserState ?? {};
  const { id: user_id = null } = user ?? {};
  const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, { user_id, with_assets: true });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostSummaryList posts={posts} />}
    </div>
  );
}
