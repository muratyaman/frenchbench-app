import React from 'react';
import { Card } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import { RandomImage } from './RandomImage';

export function FbArticle({ title, content, keywords, created_at = null }) {
  const contentWithBr = content.split('\n').map((line, idx) => (<p key={`${line}-${idx}`}>{line}</p>))
  const ago = formatDistance(new Date(created_at), new Date());
  return (
    <div className='fb-article'>
      <Card>
        <RandomImage keywords={keywords} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className='date'>{ago} ago</span>
          </Card.Meta>
          <Card.Description>
            {contentWithBr}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
