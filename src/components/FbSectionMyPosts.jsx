import React from 'react';
import { usePostsOfUser } from '../lib/usePostsOfUser';
import { FbLoadingParagraph } from './FbLoadingParagraph';
import { FbPostSummaryList } from './FbPostSummaryList';

export function FbSectionMyPosts({ api, currentUserState }) {
  const { data: user = null } = currentUserState ?? {};
  const { id: user_id = null } = user ?? {};
  const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, { user_id });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostSummaryList posts={posts} />}
    </div>
  );
}
