import React from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { Card, Image } from 'semantic-ui-react';
import { RandomImage } from './RandomImage';
import { randomImgSrc } from '../lib/randomImgSrc';
import { makePostLink } from '../lib/makePostLink';
import { makeHashTagList } from '../lib/makeHashTagLinkList';
import { FbHashTagLinkList } from './FbHashTagLinkList';

export function FbPostDetails({ post, username }) {
  const { title = '', content = '', tags = '', created_at = null, post_ref } = post;
  const dt = formatDistance(new Date(created_at), new Date());
  const tagArr = makeHashTagList(tags);
  const tag0 = tagArr[0];
  const keywords = tag0;
  const avatarSrc = randomImgSrc('silhouette', 96, 96);
  //const avatarSrc = randomAvatarSrc(username);
  const link = makePostLink({ username, post_ref });
  const contentLines = content.split('\n').map((line, idx) => (<p key={`${idx}-${line}`}>{line}</p>))
  return (
    <div className='fb-post-list-item'>
      <Card>
        <Card.Content>
          <Link href={`/app/user/${username}`}><Image floated='right' size='mini' src={avatarSrc} /></Link>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} posted {dt} ago</Card.Meta>
          <Card.Description>
            <RandomImage keywords={keywords} link={link} w={240} h={240} wrapped={false} label={null} />
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
