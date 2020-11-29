export const newAppConfig = (penv) => {
  
  const apiHost    = penv.REACT_APP_HOST; // app itself e.g. 'https://hostname'
  const apiBaseUrl = penv.REACT_APP_API_BASE_URL || '/api';
  
  const wsHost    = penv.REACT_APP_WS_HOST; // app itself e.g. 'wss://hostname'
  const wsBaseUrl = penv.REACT_APP_WS_BASE_URL || '/ws';
  
  return {
    title: 'FrenchBench',
    version: 'v1.0.0-beta',
    api: {
      host: apiHost,
      baseUrl: apiBaseUrl,
      fullUrl: apiHost + apiBaseUrl,
    },
    ws: {
      host: wsHost,
      baseUrl: wsBaseUrl,
      fullUrl: wsHost + wsBaseUrl,
    },
    cdnUrl: process.env.REACT_APP_CDN || '/',
  };
}
