import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbUserProfile } from '../users/FbUserProfile';

export function FbSectionUserHome({ api, searchInput = {}, userState = {} }) {
  const { data: user, loading = false, error = null } = userState;
  return (
    <div className='fb-user-profile'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading profile</p>}
      { user && <FbUserProfile user={user} />}
    </div>
  )
}
