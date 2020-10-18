import React from 'react';
import { Card } from 'semantic-ui-react'
import { RandomImage } from './RandomImage';

export function PostSummary({ title = '', summary = '', keywords = '', created_at = null }) {
  const summaryWithBr = summary.split('\n').map((line, idx) => (<p key={`${line}-${idx}`}>{line}</p>));
  return (
    <div className='fb-post-summary'>
      <Card>
        <RandomImage keywords={keywords} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className='date'>{created_at}</span>
          </Card.Meta>
          <Card.Description>
            {summaryWithBr}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
