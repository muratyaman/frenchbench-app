import { I18N_TYPE } from './utils';
import { ApiClient } from './utils/apiClient';

export interface FbPropsWithApi {
  api: ApiClient;
}

export interface FbPropsWithApiAndI18n extends FbPropsWithApi {
  i18n: I18N_TYPE;
}
