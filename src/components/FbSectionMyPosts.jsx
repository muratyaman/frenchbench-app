import React from 'react';
import { usePostsOfUser } from '../lib/usePostsOfUser';
import { FbLoadingParagraph } from './FbLoadingParagraph';
import { PostSummaryList } from './PostSummaryList';

export function FbSectionMyPosts({ api, userState }) {
  const { data: user = null } = userState ?? {};
  const { id: user_id = null } = user ?? {};
  const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, { user_id });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <PostSummaryList posts={posts} />}
    </div>
  );
}
