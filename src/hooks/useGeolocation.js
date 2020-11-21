// see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

import { useEffect, useState } from 'react';

export function useGeolocation(options = {}, defaultLocation = null) {

  const [location, setLocation] = useState({ location: defaultLocation, error: null });
  
  useEffect(() => {
    let mounted = true, watchId = 0;
    const geo = navigator.geolocation || null; // localize
    
    if (!geo) {
      setLocation({ location, error: 'geolocation is not supported' });
    }

    const onGeoLocation = location => {
      if (mounted) setLocation({ location, error: null });
    }

    const onError = error => {
      if (mounted) setLocation({ location: null, error });
    }
    
    if (geo) {
      // geo.getCurrentPosition(onGeoLocation, onError); // ask once, need this ?!
      watchId = geo.watchPosition(onGeoLocation, onError, options); // start watching
    }

    return function cleanup(){
      mounted = false;
      if (watchId && geo) {
        geo.clearWatch(watchId); // stop watching
      }
    }
  }, []);

  return location;
}
