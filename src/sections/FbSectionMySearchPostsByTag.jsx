import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbPostList } from '../posts/FbPostList';
import { usePostSearchByTag } from '../hooks/usePostSearchByTag';

export function FbSectionMySearchPostsByTag({ api, tag }) {
  const { data: posts = [], loading = false, error = null } = usePostSearchByTag(api, { tag, with_assets: true });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostList posts={posts} />}
    </div>
  );
}
