import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbPostList } from '../posts/FbPostList';
import { usePostsOfUser } from '../hooks/usePostsOfUser';

export function FbSectionUserPosts({ api, username }) {
  const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, { username, with_assets: true });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostList posts={posts} />}
    </div>
  );
}
