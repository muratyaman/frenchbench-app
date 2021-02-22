import { useContext } from 'react';
import { Icon, Popup, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import { usePermissions, PERM_NAME_GEOLOCATION } from '../hooks/usePermissions';
import { FbGeoLocationContext } from './FbGeoLocationContext';

const factor = 1000000;
const formatFloat = f => Math.round(f * factor) / factor;

export function FbGeoLocationStatus() {
  const { location } = useContext(FbGeoLocationContext);
  const { coords, timestamp } = location  ?? {};
  
  const { prompt, granted, denied, error } = usePermissions(PERM_NAME_GEOLOCATION);
  const name: SemanticICONS = 'map marker alternate';
  let message = 'unknown', color: SemanticCOLORS = 'grey', accuracyInfo, latInfo, lonInfo, locTime;

  if (prompt) {
    message = 'We need to track your location.';
    color = 'yellow';
  }
  if (granted) {
    message = 'Thanks, we can track your location.';
    color = 'green';
  }
  if (denied) {
    message = 'Sorry, you did not want us to track your location.';
    color = 'red';
  }
  if (error) {
    message += ' There was an error: ' + error;
  }

  if (coords) {
    const { latitude, longitude, accuracy } = coords;
    const ts = formatDistanceToNow(new Date(timestamp));
    latInfo = `latitude: ${formatFloat(latitude)}`;
    lonInfo = `longitude: ${formatFloat(longitude)}`;
    locTime = `time: ${ts} ago`;
    accuracyInfo = `accuracy: within ${accuracy}m`;
  }

  const iconProps = { name, color };
  const icon = (<Icon {...iconProps} ariaLabel={message} />);
  return (
    <Popup on={['hover', 'click']} trigger={icon}>
      <p>{message}</p>
      {coords && <p>{latInfo}<br />{lonInfo}<br />{locTime}<br />{accuracyInfo}<br /></p>}
    </Popup>
  );
}
