import React from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { Card, Image } from 'semantic-ui-react';
import { RandomImage } from './RandomImage';
import { randomImgSrc } from '../lib/randomImgSrc';

export function FbPostListItem({ title = '', tags = '', created_at = null, username }) {
  const dt = formatDistance(new Date(created_at), new Date());
  const keywords = 'people'; // tags.split(';').map(w => String(w).trim()).join(','); // TODO
  const tagLinkList = tags.split(';').map(w => w.trim()).map((w, idx) => (
    <Link key={`tag-${idx}-${w}`} href={`/app/posts-by-tag/${w}`}><span>#{w}&nbsp;</span></Link>
  ))
  return (
    <div className='fb-post-list-item'>
      <Card>
        <Card.Content>
          <Link href={`/app/user/${username}`}><Image floated='right' size='mini' src={randomImgSrc('silhouette', 96, 96)} /></Link>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} posted {dt} ago</Card.Meta>
          <Card.Description>
            { tags && <RandomImage keywords={keywords} w={280} h={280} wrapped={false} label={null} />}
            <div>{tagLinkList}</div>
          </Card.Description>
        </Card.Content>
      </Card>

    </div>
  );
}
