// see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions

import { useEffect, useState } from 'react';

export const STATUS_PROMPT  = 'prompt';
export const STATUS_GRANTED = 'granted';
export const STATUS_DENIED  = 'denied';

export const PERM_NAME_GEOLOCATION = 'geolocation';

export function usePermissions(name) {

  const [permissionObj, setPermissionObj] = useState({
    granted: false,
    denied: false,
    prompt: false,
    error: null,
  });

  useEffect(() => {
    try {
      navigator.permissions.query({ name })
        .then(result => {
          permissionObj.prompt  = (result.state === STATUS_PROMPT);
          permissionObj.granted = (result.state === STATUS_GRANTED);
          permissionObj.denied  = (result.state === STATUS_DENIED);
          setPermissionObj(permissionObj);
        });
    } catch (err) {
      permissionObj.error = err;
      setPermissionObj(permissionObj);
    }
  }, [ name ]);

  return permissionObj;
}
