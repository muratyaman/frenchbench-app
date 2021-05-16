import { FbLoadingParagraph } from '../components';
import { FbAdvertDetails } from './FbAdvertDetails';
import { useAdvertByUserAndRef } from '../hooks/useAdvertByUserAndRef';

export function FbUserAdvertLoader({ api, username, slug }) {
  const { data: advert = null, loading = false, error = null } = useAdvertByUserAndRef(api, { username, slug, with_assets: true });
  return (
    <div className='fb-advert-details'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading advert</p>}
      { advert && <FbAdvertDetails api={api} advert={advert} username={username} />}
    </div>
  );
}
