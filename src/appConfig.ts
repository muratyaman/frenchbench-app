import { geoLondonEye } from './geoLocation/glUtils';

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
        zoom: 16,
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

export interface IProcessEnv {
  PUBLIC_URL?: string;

  REACT_APP_VERSION?: string; // e.g. '1.2.3'
  
  REACT_APP_HOST?: string; // e.g. "http://localhost:3000"
  REACT_APP_API_BASE_URL?: string; // e.g. "/api"
  
  REACT_APP_WS_HOST?: string; // e.g. "ws://localhost:12000"
  REACT_APP_WS_BASE_URL?: string; // e.g. "/ws"
  
  REACT_APP_CDN?: string; // e.g. "https://s3-url.amazonaws.com"
  
  HTTP_PORT?: string; // e.g. '3000'
  
  // for proxying '/api'
  API_HOST?: string; // e.g. "http://localhost:12000"
  API_BASE_URL?: string; // e.g. "/api"
  
  GEO_LAT_DELTA?: string; // e.g. "0.01"
  GEO_LON_DELTA?: string; // e.g. "0.01"

  REACT_APP_MAPBOX_ACCESS_TOKEN?: string;
  REACT_APP_MAP_STYLE?: string;
}

export interface IAppConfig {
  title: string;
  version: string;
  api: IHostConfig;
  ws: IHostConfig;
  cdnUrl: string;
  map: IMapConfig;
};

export interface IHostConfig {
  host: string;
  baseUrl: string;
  fullUrl: string;
}

export interface IMapConfig {
  defaultViewport: IMapViewportConfig;
  fixedSettings: IMapFixedSettingsConfig;
}

export interface IMapViewportConfig {
  width: string; // '100%'
  height: string; // '100%'
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface IMapFixedSettingsConfig {
  width: string; // '100%'
  height: string; // '100%'
  mapboxApiAccessToken: string;
  mapStyle: string;
}

export function makeHostConfig(host: string, baseUrl: string): IHostConfig {
  return {
    host,
    baseUrl,
    fullUrl: `${host}${baseUrl}`,
  };
}
