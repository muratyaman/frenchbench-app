import React from 'react';
import { apiClient } from '../utils/apiClient';

const defaultContext = {
  api: null,
}

export const FbApiContext = React.createContext(defaultContext);

export function FbApiContextProvider(props) {
  let { apiConfig, api = null } = props;
  if (!api) api = apiClient({ ...apiConfig });
  return (
    <FbApiContext.Provider value={api}>
      {props.children}
    </FbApiContext.Provider>
  );
}
