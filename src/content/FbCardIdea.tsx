import { Card } from 'semantic-ui-react';
import { FbRandomImage } from '../components';

export function FbCardIdea({ title, keywords, idea }) {
  return (
    <div className='fb-card-idea'>
      <Card fluid>
        <FbRandomImage keywords={keywords} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>
            <div className='fb-desc-row'>⭐️ {idea}</div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
