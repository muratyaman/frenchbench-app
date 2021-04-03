import { FC, PropsWithChildren } from 'react';
import { FbAdvertListItem } from '../adverts/FbAdvertListItem';
import { FbPropsWithApiAndI18n } from '../types';
import { AdvertSummaryModel } from '../utils/apiClient';

export interface FbMapAdvertInfoProps extends FbPropsWithApiAndI18n {
  advert: AdvertSummaryModel;
}

export const FbMapAdvertInfo: FC<FbMapAdvertInfoProps> = (props: PropsWithChildren<FbMapAdvertInfoProps>) => {
  const { api, i18n, advert } = props;
  const adProps = { api, i18n, advert, summary: '', keywords: '', assetImgProps: { w: 240, h: 240 } };
  return (
    <div className='map-advert-info'>
      <FbAdvertListItem {...adProps} />
    </div>
  );
}
