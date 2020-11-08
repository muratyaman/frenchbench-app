import React from 'react';
import Link from 'next/link';
import { Icon, Label } from 'semantic-ui-react';
import { makeHashTagList } from '../lib/makeHashTagLinkList';

export function FbHashTagLinkList({ tags = '' }) {
  const tagArr = makeHashTagList(tags);
  if (0 === tagArr.length) return null;
  const tagLinkList = tagArr.map((w, idx) => (
    <Link key={`tag-${idx}-${w}`} href={`/app/my/search/posts-by-tag/${w.replace('#', '')}`}>
      <Label size='small'><Icon name='hashtag' /> {w}&nbsp;</Label>
    </Link>
  ))
  return <div className='fb-tags'>{tagLinkList}</div>;
}
