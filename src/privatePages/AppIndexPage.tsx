import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbMap } from '../map';
import { geoLondonEye } from '../geoLocation/glUtils';
import { FbGeoLocationContext } from '../geoLocation';
import { useContext } from 'react';

export function AppIndexPage({ appConfig, api, i18n }) {  
  const layoutProps = { appConfig, title: 'Home' };
  const myMenuProps = { activeItem: 'home', api, i18n };

  const { location } = useContext(FbGeoLocationContext);
  const { coords } = location ?? {};

  const { heading = 0 } = {} ; // currentAbsOrientation;
  const bearing = 360 - heading;
  const centre = coords ? coords : geoLondonEye;
  const { defaultViewport, fixedSettings } = appConfig.map;
  const mapProps = { centre, bearing, defaultViewport, fixedSettings }
  
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div>
        TODO: display all events happening around me
      </div>
      <div className="fb-map-container">
        <FbMap {...mapProps} />
      </div>
    </ProtectedLayout>
  );
}
