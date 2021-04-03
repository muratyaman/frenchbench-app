import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbMap } from '../map';
import { geoLondonEye } from '../geoLocation/glUtils';
import { FbGeoLocationContext } from '../geoLocation';
import { useContext } from 'react';
import { useAdvertSearch } from '../hooks/useAdvertSearch';

export function AppIndexPage({ appConfig, api, i18n }) {  
  const layoutProps = { appConfig, title: 'Home', containerClassName: 'fb-page-app-index' };
  const myMenuProps = { activeItem: 'home', api, i18n };

  const { location } = useContext(FbGeoLocationContext);
  const { coords } = location ?? {};

  const { heading = 0 } = {} ; // currentAbsOrientation;
  const bearing = 360 - heading;
  const centre = coords ? coords : geoLondonEye;
  const { defaultViewport, fixedSettings } = appConfig.map;

  const { data: adverts = []} = useAdvertSearch(api);
  const mapProps = { api, i18n, centre, bearing, defaultViewport, fixedSettings, adverts };
  
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbMap {...mapProps} />
      </div>
    </ProtectedLayout>
  );
}
