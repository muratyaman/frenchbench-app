import React from 'react';
import { formatDistance } from 'date-fns';
import { Card } from 'semantic-ui-react';
import { FbLink } from './FbLink';
import { FbAssetImage } from './FbAssetImage';
import { makePostLink } from '../lib/makePostLink';

export function FbPostSummary({ id, title, summary, keywords, created_at, username, post_ref, assets = [] }) {
  const dt = formatDistance(new Date(created_at), new Date());
  const link = makePostLink({ username, post_ref });
  console.log('FbPostSummary', assets);
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  return (
    <div className='fb-post-summary'>
      <Card fluid>
        <FbLink to={link}><FbAssetImage asset={asset0info} keywords={keywords} w={240} h={240} /></FbLink>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta><span className='date'>{dt} ago</span></Card.Meta>
          <Card.Description>{summary}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
