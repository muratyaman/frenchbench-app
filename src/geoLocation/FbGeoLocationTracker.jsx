import React, { useContext } from 'react';
import { FbGeoLocationContext } from './FbGeoLocationContext';
import { MSG_KIND_GEO, FbWebSocketContext } from '../webSockets/FbWebSocketContext';

export const track = (send, location) => {
  const msgObj = {
    kind: MSG_KIND_GEO,
    geo: location,
    ts: (new Date()).toISOString(),
  }
  send(msgObj);
}

export function FbGeoLocationTracker() {
  const { location } = useContext(FbGeoLocationContext);
  const { socketStatusFlags, send } = useContext(FbWebSocketContext);
  const { isOpen } = socketStatusFlags();

  if (isOpen && location) {
    track(send, location);
  }

  return (
    <span />
  )
}
