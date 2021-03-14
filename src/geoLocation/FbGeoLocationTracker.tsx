import { useContext } from 'react';
import { FbGeoLocationContext } from './FbGeoLocationContext';
import * as glUtils from './glUtils';
import { FbWebSocketContext } from '../webSockets/FbWebSocketContext';
import * as wsUtils from '../webSockets/wsUtils';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export const track = (send, location: glUtils.FbGeoLocation) => {
  const msgObj = {
    kind: wsUtils.MSG_KIND_ENUM.GEO,
    geo: location,
    ts: (new Date()).toISOString(),
  }
  send(msgObj);
}

export function FbGeoLocationTracker() {
  const { data: user } = useContext(FbCurrentUserContext);
  const { location } = useContext(FbGeoLocationContext);
  const { socketStatusFlags, send } = useContext(FbWebSocketContext);
  const { isOpen } = socketStatusFlags();
  if (isOpen && location && user) {
    track(send, location);
  }
  return (<span className='hidden z1' />);
}
