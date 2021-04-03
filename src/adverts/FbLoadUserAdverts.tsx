import { FbLoadingParagraph } from '../components';
import { FbAdvertList } from './FbAdvertList';
import { useAdvertsOfUser } from '../hooks/useAdvertsOfUser';

export function FbLoadUserAdverts({ api, i18n, username }) {
  const { data: adverts = [], loading = false, error = null } = useAdvertsOfUser(api, { username, with_assets: true });
  return (
    <div className='fb-advert-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading adverts</p>}
      { adverts && <FbAdvertList api={api} i18n={i18n} adverts={adverts} />}
    </div>
  );
}
