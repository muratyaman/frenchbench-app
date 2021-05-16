import { ApiClient, I18N_TYPE } from './utils';

export interface FbPropsWithApi {
  api: ApiClient;
}

export interface FbPropsWithApiAndI18n extends FbPropsWithApi {
  i18n: I18N_TYPE;
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
}

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

export interface AppProps<TSsrData = any> {
  appConfig: IAppConfig;
  ssr: boolean;
  hydrating: boolean;
  initialState?: any;
  pageProps?: {
    ssrData: TSsrData;
  };
}

export type AppPageProps<TSsrData = any> = AppProps<TSsrData> & {
  api: ApiClient;
  i18n: I18N_TYPE;
  ssrData?: TSsrData;
}
