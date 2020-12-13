import React from 'react';
import { FbLink } from './FbLink';
import { formatDistance } from 'date-fns';
import { Card, Image, Label } from 'semantic-ui-react';
import { FbAssetImage } from './FbAssetImage';
import { FbHashTagLinkList } from './FbHashTagLinkList';
import { randomImgSrc } from '../utils/randomImgSrc';
import { makeAdvertLink } from '../utils/makeAdvertLink';
import { makeHashTagList } from '../utils/makeHashTagLinkList';

export function FbAdvertDetails({ api, advert, username }) {
  const { title = '', content = '', tags = '', is_buying, is_service, price, currency, created_at = null, advert_ref, assets = [] } = advert;
  const dt = formatDistance(new Date(created_at), new Date());
  const tagArr = makeHashTagList(tags);
  const tag0 = tagArr[0];
  const keywords = tag0;
  const avatarSrc = randomImgSrc('silhouette', 96, 96);
  const link = makeAdvertLink({ username, advert_ref });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  const contentLines = content.split('\n').map((line, idx) => (<p key={`${idx}-${line}`}>{line}</p>))
  const buyingOption = api.options.buyingOptionList().find(({ id }) => id == is_buying);
  const serviceOption = api.options.serviceOptionList().find(({ id }) => id == is_service);
  const currencyOption = api.options.currencyOptionList().find(({ id }) => id == currency);
  const priceDesc = `${currencyOption.symbol}${price}`;
  return (
    <div className='fb-advert-list-item'>
      <Card>
        <Card.Content>
          <FbLink to={`/app/user/${username}`}><Image floated='right' size='mini' src={avatarSrc} /></FbLink>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} advertised {dt} ago</Card.Meta>
          <Card.Description>
            <FbAssetImage asset={asset0info} keywords={keywords} link={link} w={240} h={240} wrapped={false} label={{
              as: 'span',
              color: 'purple',
              content: priceDesc,
              icon: 'moeny',
              ribbon: true,
            }} />
          </Card.Description>
          <Card.Description extra>
            <FbHashTagLinkList tags={tags} />
          </Card.Description>
          <Card.Description extra>
            <Label color='purple' ribbon='right'>{username} wants to {buyingOption.label} {priceDesc} for this {serviceOption.label}</Label>
            {contentLines}
          </Card.Description>
        </Card.Content>
      </Card>

    </div>
  );
}
