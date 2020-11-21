import React from 'react';
//import { useGeolocation } from '../hooks/useGeolocation';
//import { usePermissionsGeolocation } from '../hooks/usePermissionsGeolocation';
//import { usePostsOfUser } from '../lib/usePostsOfUser';
//import { FbLoadingParagraph } from './FbLoadingParagraph';
//import { FbPostSummaryList } from './FbPostSummaryList';

export function FbSectionMyNeighbours({ api, currentUserState }) {
  const { data: user = null } = currentUserState ?? {};
  const { id: user_id = null } = user ?? {};
  //const { data: posts = [], loading = false, error = null } = usePostsOfUser(api, { user_id, with_assets: true });
  const location = {};//useGeolocation();
  const { prompt, granted, denied, error } = {};//usePermissionsGeolocation();
  return (
    <div className='fb-post-search'>
      { prompt && <p>We need to track your location anonymously.</p>}
      { granted && <p>Thanks, we can track your location anonymously.</p>}
      { denied && <p>Sorry, you did not want us to track your location anonymously.</p>}
      { error && <p>There was an error {error}.</p>}
      <p>current location: {JSON.stringify(location)}</p>
    </div>
  );
}
