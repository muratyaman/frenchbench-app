// see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

import { useEffect, useState } from 'react';

// @see https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
export const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 60 * 1000,
  maximumAge: 60 * 1000,
};

export function useGeolocation(options = defaultOptions, defaultLocation = null) {

  const [location, setLocation] = useState(defaultLocation);
  const [error, setError] = useState(null);
  
  let mounted = false, watchId = 0, geo = null;

  const onSuccess = newLocation => {
    if (mounted) {
      setLocation(newLocation);
    }
  }

  const onError = error => {
    if (mounted) setLocation(error);
  }

  useEffect(() => {
    mounted = true;
    watchId = 0;
    geo = navigator.geolocation; // localize
    
    if (geo) {
      watchId = geo.watchPosition(onSuccess, onError, options); // start watching
      console.log('useGeolocation watchId', watchId);
    } else {
      setError('geolocation is not supported');
    }

    return function cleanup(){
      mounted = false;
      if (watchId && geo) {
        geo.clearWatch(watchId); // stop watching
      }
    }
  }, []);

  return { location, error, mounted, watchId };
}
