import { createContext, FC, PropsWithChildren } from 'react';
import { ApiClient, ApiClientOptions } from '../utils/apiClient';

export interface ApiContextType {
  api: ApiClient;
}

const defaultContext: ApiContextType = {
  api: new ApiClient(),
};

export const FbApiContext = createContext<ApiContextType>(defaultContext);

export interface FbApiContextProviderProps {
  apiConfig: ApiClientOptions;
  api?: ApiClient | null;
}

export const FbApiContextProvider: FC<FbApiContextProviderProps> = (
  props: PropsWithChildren<FbApiContextProviderProps>,
) => {
  const { apiConfig, api = new ApiClient(apiConfig) } = props;
  return (
    <FbApiContext.Provider value={{ api }}>
      {props.children}
    </FbApiContext.Provider>
  );
}
