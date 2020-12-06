import React, { useContext, useState } from 'react';
//import { useGeolocation } from '../hooks/useGeolocation';
import { GeoLocationContext } from './GeoLocationContext';
import { MSG_KIND_GEO, WebSocketContext } from './WebSocketContext';

export const track = (send, location) => {
  const msgObj = {
    kind: MSG_KIND_GEO,
    geo: location,
    ts: (new Date()).toISOString(),
  }
  send(msgObj);
}

export function FbGeoLocationTracker() {
  const { location } = useContext(GeoLocationContext);
  //const { location } = useGeolocation();
  const { socketStatusFlags, send } = useContext(WebSocketContext);
  const { isOpen } = socketStatusFlags();

  if (isOpen && location) {
    track(send, location);
  }

  return (
    <span />
  )
}
