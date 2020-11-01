import React from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { Card, Image, Label } from 'semantic-ui-react';
import { FbAssetImage } from './FbAssetImage';
import { randomImgSrc } from '../lib/randomImgSrc';
import { makePostLink } from '../lib/makePostLink';
import { makeHashTagList } from '../lib/makeHashTagLinkList';
import { FbHashTagLinkList } from './FbHashTagLinkList';

export function FbPostListItem({ id, title, tags, created_at, username, post_ref, assets = [] }) {
  const dt = formatDistance(new Date(created_at), new Date());
  const tagArr = makeHashTagList(tags);
  const tag0 = tagArr[0];
  const keywords = tag0 !== '' ? tag0 : 'community';
  const avatarSrc = randomImgSrc('silhouette', 96, 96);
  const link = makePostLink({ username, post_ref });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  return (
    <div className='fb-post-list-item'>
      <Card>
        <Card.Content>
          <Link href={`/app/user/${username}`}><Image floated='right' size='mini' src={avatarSrc} /></Link>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} posted {dt} ago (123 views)</Card.Meta>
          <Card.Description>
            <Link href={link}>
              <div>
                <FbAssetImage asset={asset0info} keywords={keywords} link={link} w={240} h={240} wrapped={false} label={null} />
                <Label color='purple' ribbon='right'>Read post</Label>
              </div>
            </Link>
          </Card.Description>
          <Card.Description extra>
            <FbHashTagLinkList tags={tags} />
          </Card.Description>
        </Card.Content>
      </Card>

    </div>
  );
}
