import React from 'react';
import { formatDistance } from 'date-fns';
import { Card, Label } from 'semantic-ui-react';
import { makeAdvertLink } from '../utils/makeAdvertLink';
import { FbLink } from '../components';
import { FbAssetImage } from '../assets/FbAssetImage';

export function FbAdvertSummary({ id, title, summary, keywords, price, currency, created_at, username, advert_ref, assets = [] }) {
  const dt = formatDistance(new Date(created_at), new Date());
  const link = makeAdvertLink({ username, advert_ref });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  return (
    <div className='fb-advert-summary'>
      <Card fluid>
        <FbLink to={link}><FbAssetImage asset={asset0info} keywords={keywords} w={240} h={240} /></FbLink>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta><span className='date'>{dt} ago</span></Card.Meta>
          <Card.Description>{summary}</Card.Description>
          <Card.Description extra>
            <Label color='green' ribbon='right'>{price} {currency}</Label>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
