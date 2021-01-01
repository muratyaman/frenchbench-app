import React from 'react';
import { FbLink } from './FbLink';
import { Icon, Label } from 'semantic-ui-react';
import { makeHashTagList } from '../utils/makeHashTagList';

export function FbHashTagLinkList({ tags = '' }) {
  const tagArr = makeHashTagList(tags);
  if (0 === tagArr.length) return null;
  const tagLinkList = tagArr.map((w, idx) => (
    <FbLink key={`tag-${idx}-${w}`} to={`/app/my/search/posts-by-tag/${w.replace('#', '')}`}>
      <Label size='small'><Icon name='hashtag' /> {w} </Label>&nbsp;
    </FbLink>
  ))
  return <div className='fb-tags'>{tagLinkList}</div>;
}
