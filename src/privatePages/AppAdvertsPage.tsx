import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAdvertSearch } from '../adverts/FbAdvertSearch';
import { FbAppMenu } from '../menus/FbAppMenu';

export function AppAdvertsPage({ appConfig, api, i18n }) {
  const layoutProps = { appConfig, title: 'Adverts' };
  const myMenuProps = { activeItem: 'adverts', api, i18n };
  const searchProps = { api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbAdvertSearch {...searchProps} />
      </div>
    </ProtectedLayout>
  );
}
