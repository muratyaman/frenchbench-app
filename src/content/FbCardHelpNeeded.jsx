import React from 'react';
import { Card } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { RandomImage } from '../components';

export function FbCardHelpNeeded({ i18n }) {
  return (
    <div className='fb-card-help-needed'>
      <Card fluid>
        <RandomImage keywords='community,care,doctor,nurse,garden,barber,handyman' />
        <Card.Content>
          <Card.Header>I Need Help</Card.Header>
          <Card.Description>
            <div>
              <span>⭐️ I need&nbsp;</span>
              <TextLoop>
                <span>to talk to someone</span>
                <span>to learn coding</span>
                <span>a caretaker</span>
                <span>help with shopping</span>
                <span>a gardener</span>
                <span>lots of food for my party</span>
                <span>a haircut</span>
                <span>a bicycle</span>
                <span>to fix my heater</span>
              </TextLoop>
              <span>&nbsp;.</span>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
