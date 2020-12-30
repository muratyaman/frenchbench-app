import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbAdvertSummaryList } from '../adverts/FbAdvertSummaryList';
import { useAdvertsOfUser } from '../hooks/useAdvertsOfUser';

export function FbSectionMyAdverts({ api, currentUserState }) {
  const { data: user = null } = currentUserState ?? {};
  const { id: user_id = null } = user ?? {};
  const { data: adverts = [], loading = false, error = null } = useAdvertsOfUser(api, { user_id, with_assets: true });
  return (
    <div className='fb-advert-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading adverts</p>}
      { adverts && <FbAdvertSummaryList adverts={adverts} />}
    </div>
  );
}
