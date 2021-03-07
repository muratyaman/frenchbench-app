import { FC, PropsWithChildren } from 'react';
import { AdvertSummaryModel } from '../utils/apiClient';

export interface FbMapAdvertInfoProps {
  info: AdvertSummaryModel;
}

export const FbMapAdvertInfo: FC<FbMapAdvertInfoProps> = (props: PropsWithChildren<FbMapAdvertInfoProps>) => {
  const { info } = props;
  const displayName = `${info.created_at}`;
  const asset0 = info.assets[0].asset;
  return (
    <div>
      <div>
        {displayName}
      </div>
      {asset0 && <img width={240} src={asset0.url} alt='info here' />}
    </div>
  );
}
