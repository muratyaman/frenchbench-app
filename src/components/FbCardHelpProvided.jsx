import { Card } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { RandomImage } from './RandomImage';

export function FbCardHelpProvided(props) {
  return (
    <div className='fb-card-help-provided'>
      <Card>
        <RandomImage keywords='community,help,doctor,nurse,teacher,barber,electrician,cook,handyman' />
        <Card.Content>
          <Card.Header>I Can Help</Card.Header>
          <Card.Description>
            <div>
              <span>&#9733; I am &nbsp;</span>
              <TextLoop>
                <span>a doctor</span>
                <span>a nurse</span>
                <span>a teacher</span>
                <span>a gardener</span>
                <span>a cleaner</span>
                <span>a barber</span>
                <span>an electrician</span>
                <span>a handyman</span>
                <span>a cook</span>
                <span>selling a bicycle</span>
                <span>selling a lawn mower</span>
              </TextLoop>
              <span>&nbsp;.</span>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
