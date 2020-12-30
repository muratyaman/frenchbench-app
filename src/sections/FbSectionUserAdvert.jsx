import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbAdvertDetails } from '../adverts/FbAdvertDetails';
import { useAdvertByUserAndRef } from '../hooks/useAdvertByUserAndRef';

export function FbSectionUserAdvert({ api, username, advert_ref }) {
  const { data: advert = null, loading = false, error = null } = useAdvertByUserAndRef(api, { username, advert_ref, with_assets: true });
  return (
    <div className='fb-advert-details'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading advert</p>}
      { advert && <FbAdvertDetails api={api} advert={advert} username={username} />}
    </div>
  );
}
