import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbUserProfile } from './FbUserProfile';

export function FbLoadUserProfile({ userState = null }) {
  const { data: user, loading = false, error = null } = userState ?? {};
  return (
    <div className='fb-user-profile'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading profile</p>}
      {!user && <p>no user info</p>}
      { user && <FbUserProfile user={user} />}
    </div>
  )
}
