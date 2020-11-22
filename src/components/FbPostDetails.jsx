import React from 'react';
import { FbLink } from './FbLink';
import { formatDistance } from 'date-fns';
import { Card, Image } from 'semantic-ui-react';
import { FbAssetImage } from './FbAssetImage';
import { FbHashTagLinkList } from './FbHashTagLinkList';
import { randomImgSrc } from '../utils/randomImgSrc';
import { makePostLink } from '../utils/makePostLink';
import { makeHashTagList } from '../utils/makeHashTagLinkList';

export function FbPostDetails({ post, username }) {
  const { title = '', content = '', tags = '', created_at = null, post_ref, assets = [] } = post;
  const dt = formatDistance(new Date(created_at), new Date());
  const tagArr = makeHashTagList(tags);
  const tag0 = tagArr[0];
  const keywords = tag0;
  const avatarSrc = randomImgSrc('silhouette', 96, 96);
  const link = makePostLink({ username, post_ref });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  const contentLines = content.split('\n').map((line, idx) => (<p key={`${idx}-${line}`}>{line}</p>))
  return (
    <div className='fb-post-list-item'>
      <Card>
        <Card.Content>
          <FbLink to={`/app/user/${username}`}><Image floated='right' size='mini' src={avatarSrc} /></FbLink>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} posted {dt} ago</Card.Meta>
          <Card.Description>
            <FbAssetImage asset={asset0info} keywords={keywords} link={link} w={240} h={240} wrapped={false} label={null} />
          </Card.Description>
          <Card.Description extra>
            <FbHashTagLinkList tags={tags} />
          </Card.Description>
          <Card.Description extra>
            {contentLines}
          </Card.Description>
        </Card.Content>
      </Card>

    </div>
  );
}
