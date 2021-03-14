import { FC, PropsWithChildren, useContext } from 'react';
import { formatDistance } from 'date-fns';
import { Card, Image, Label } from 'semantic-ui-react';
import { randomImgSrc } from '../utils/randomImgSrc';
import { makeAdvertLink } from '../makeRoutes';
import { makeHashTagList } from '../utils/makeHashTagList';
import { FbHashTagLinkList, FbLink } from '../components';
import { FbAssetImage, FbAssetImageProps } from '../assets/FbAssetImage';
import { FbI18nContext } from '../contexts';
import { AdvertSummaryModel } from '../utils';
import * as c from '../constants';

export interface FbAdvertListItemProps {
  advert: AdvertSummaryModel;
  assetImgProps?: FbAssetImageProps;
}

export const FbAdvertListItem: FC<FbAdvertListItemProps> = (props: PropsWithChildren<FbAdvertListItemProps>) => {
  const { advert, assetImgProps = {} } = props;
  const { id, title, tags, created_at, username, slug, is_buying, price, currency, assets = [] } = advert;
  const { i18n } = useContext(FbI18nContext);
  const dt = formatDistance(new Date(created_at), new Date());
  const tagArr = makeHashTagList(tags);
  const tag0 = tagArr[0];
  const keywords = tag0 !== '' ? tag0 : 'community';
  const avatarSrc = randomImgSrc('silhouette', 96, 96);
  const link = makeAdvertLink({ username, slug });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  const priceInfo = is_buying ? i18n._('buying_options__1__label') : i18n._('buying_options__0__label');
  const priceColor = is_buying ? c.buyingColour : c.sellingColour;
  return (
    <div className='fb-advert-list-item'>
      <Card>
        <Card.Content>
          <FbLink to={`/app/user/${username}`}><Image floated='right' size='mini' src={avatarSrc} /></FbLink>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} advertised {dt} ago (123 views)</Card.Meta>
          <Card.Description>
            <FbLink to={link}>
              <div>
                <FbAssetImage asset={asset0info} keywords={keywords} link={link} w={240} h={240} wrapped={false} label={null} {...assetImgProps} />
                <Label color={priceColor} ribbon='right'>{priceInfo} {price} {currency}</Label>
              </div>
            </FbLink>
          </Card.Description>
          <Card.Description extra>
            <FbHashTagLinkList tags={tags} />
          </Card.Description>
        </Card.Content>
      </Card>

    </div>
  );
}
