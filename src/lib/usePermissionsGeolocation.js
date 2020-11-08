// see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions

import { useEffect, useState } from 'react';

const STATE_PROMPT  = 'prompt';
const STATE_GRANTED = 'granted';
const STATE_DENIED  = 'denied';

export function usePermissionsGeolocation() {

  const [permissionObj, setPermissionObj] = useState({
    granted: false,
    denied: false,
    prompt: false,
    error: null,
  });

  useEffect(() => {
    try {
      navigator.permissions.query({ name: 'geolocation' })
        .then(result => {
          permissionObj.prompt  = (result.state === STATE_PROMPT);
          permissionObj.granted = (result.state === STATE_GRANTED);
          permissionObj.denied  = (result.state === STATE_DENIED);
          setPermissionObj(permissionObj);
        });
    } catch (err) {
      permissionObj.error = err;
      setPermissionObj(permissionObj);
    }
  }, []);

  return permissionObj;
}