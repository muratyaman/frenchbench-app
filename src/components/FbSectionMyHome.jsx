import React from 'react';
import { usePostSearch } from '../lib/usePostSearch';
import { FbLoadingParagraph } from './FbLoadingParagraph';
import { FbPostList } from './FbPostList';

export function FbSectionMyHome({ api, searchInput = {} }) {
  const { data: posts = [], loading = false, error = null } = usePostSearch(api, searchInput);
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading posts</p>}
      { posts && <FbPostList posts={posts} />}
    </div>
  )
}
