import { geoLondonEye } from './geoLocation/glUtils';
import { IAppConfig, IHostConfig, IProcessEnv } from './types';

export function newAppConfig(penv: IProcessEnv): IAppConfig {
  return {
    title: 'FrenchBench',
    version: penv.REACT_APP_VERSION || '1.0.0',
    api: makeHostConfig(penv.REACT_APP_HOST, penv.REACT_APP_API_BASE_URL || '/api'),
    ws: makeHostConfig(penv.REACT_APP_WS_HOST, penv.REACT_APP_WS_BASE_URL || '/ws'),
    cdnUrl: penv.REACT_APP_CDN || '/',
    map: {
      defaultViewport: {
        width: '100%',
        height: '100%',
        latitude: geoLondonEye.latitude,
        longitude: geoLondonEye.longitude,
        zoom: 15,
      },
      fixedSettings: {
        width: '100%',
        height: '100%',
        mapboxApiAccessToken: penv.REACT_APP_MAPBOX_ACCESS_TOKEN || 'no-map-access-token',
        mapStyle: penv.REACT_APP_MAP_STYLE || null,
      },
    },
  };
}

export function makeHostConfig(host: string, baseUrl: string): IHostConfig {
  return {
    host,
    baseUrl,
    fullUrl: `${host}${baseUrl}`,
  };
}
