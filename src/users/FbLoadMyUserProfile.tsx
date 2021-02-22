import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbUserProfile } from './FbUserProfile';

export function FbLoadMyUserProfile({ currentUserState = null }) {
  const { data: user, loading = false, error = null } = currentUserState ?? {};
  const { username, first_name } = user ?? {};
  const greet = first_name ?? username;
  return (
    <div className='fb-user-profile'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading profile</p>}
      {!user && <p>no user info</p>}
      { user && (
        <div>
          <p>Hi {greet}! This is your profile page.</p>
          <FbUserProfile user={user} />
        </div>
      )}
    </div>
  )
}
