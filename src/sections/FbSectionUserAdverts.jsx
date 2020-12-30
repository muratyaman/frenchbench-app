import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbAdvertList } from '../adverts/FbAdvertList';
import { useAdvertsOfUser } from '../hooks/useAdvertsOfUser';

export function FbSectionUserAdverts({ api, username }) {
  const { data: adverts = [], loading = false, error = null } = useAdvertsOfUser(api, { username, with_assets: true });
  return (
    <div className='fb-advert-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading adverts</p>}
      { adverts && <FbAdvertList adverts={adverts} />}
    </div>
  );
}
