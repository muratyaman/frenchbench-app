import { FC, PropsWithChildren } from 'react';
import { FbAdvertListItem } from '../adverts/FbAdvertListItem';
import { AdvertSummaryModel } from '../utils/apiClient';

export interface FbMapAdvertInfoProps {
  advert: AdvertSummaryModel;
}

export const FbMapAdvertInfo: FC<FbMapAdvertInfoProps> = (props: PropsWithChildren<FbMapAdvertInfoProps>) => {
  const { advert } = props;
  const adProps = { advert, summary: '', keywords: '', assetImgProps: { w: 240, h: 240 } };
  return (
    <div className='map-advert-info'>
      <FbAdvertListItem {...adProps} />
    </div>
  );
}
