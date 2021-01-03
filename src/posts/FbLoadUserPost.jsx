import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbPostDetails } from './FbPostDetails';
import { usePostByUserAndRef } from '../hooks/usePostByUserAndRef';

export function FbLoadUserPost({ api, username, post_ref }) {
  const { data: post = null, loading = false, error = null } = usePostByUserAndRef(api, { username, post_ref, with_assets: true });
  return (
    <div className='fb-post-details'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading post</p>}
      { post && <FbPostDetails post={post} username={username} />}
    </div>
  );
}
