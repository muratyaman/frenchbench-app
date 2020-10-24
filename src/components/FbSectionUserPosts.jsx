import React from 'react';
import { usePostsOfUser } from '../lib/usePostsOfUser';
import { FbLoadingParagraph } from './FbLoadingParagraph';
import { FbPostList } from './FbPostList';

export function FbSectionUserPosts({ api, username }) {
  const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, { username });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostList posts={posts} />}
    </div>
  );
}
