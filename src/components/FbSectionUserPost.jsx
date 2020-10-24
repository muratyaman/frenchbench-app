import React from 'react';
import Link from 'next/link';
import { usePostByUserAndRef } from '../lib/usePostByUserAndRef';
import { FbLoadingParagraph } from './FbLoadingParagraph';
import { FbPostDetails } from './FbPostDetails';
import { Icon, Label } from 'semantic-ui-react';

export function FbSectionUserPost({ api, username, post_ref }) {
  const { data: post = null, loading = false, error = null } = usePostByUserAndRef(api, { username, post_ref });
  return (
    <div className='fb-post-details'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading post</p>}
      { post && (
        <>
          { /*<div><Link href={`/app/user/${username}`}><Label><Icon name='arrow alternate circle left'/> Back </Label></Link></div>*/ }
          { loading && <FbLoadingParagraph /> }
          { error && <p>Error loading post</p>}
          { post && <FbPostDetails post={post} username={username} />}
        </>
      )}
    </div>
  );
}
