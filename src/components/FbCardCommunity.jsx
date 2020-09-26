import { Card } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { RandomImage } from './RandomImage';

export function FbCardCommunity(props) {
  return (
    <div className='fb-card-community'>
      <Card>
        <RandomImage keywords='community' />
        <Card.Content>
          <Card.Header>FrenchBench Community</Card.Header>
          <Card.Description>
            <div>⭐️&#9733; keep learning.</div>
            <div>⭐️&#9733; keep sharing.</div>
            <div>
              <span>⭐️&#9733; keep helping with your&nbsp;</span>
              <TextLoop>
                <span>time</span>
                <span>knowledge</span>
                <span>products</span>
                <span>services</span>
              </TextLoop>
              <span>&nbsp;.</span>
            </div>
            <div>
              <span>⭐️&#9733; find or receive help in your neighbourhood.</span>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
