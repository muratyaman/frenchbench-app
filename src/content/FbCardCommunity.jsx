import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { RandomImage } from '../components';

export function FbCardCommunity({ i18n }) {
  return (
    <div className='fb-card-community'>
      <Card fluid>
        <RandomImage keywords='community' preferName='001.jpg' />
        <Card.Content>
          <Card.Header>FrenchBench Communities</Card.Header>
          <Card.Description>
            <div className='fb-desc-row'>⭐️ relevant and <Label as='span' color='red' size='small'>local</Label></div>
            <div className='fb-desc-row'>
              <span>⭐️ keep helping with your&nbsp;</span>
              <TextLoop>
                <span><Label as='span' size='small' color='orange'>time</Label></span>
                <span><Label as='span' size='small' color='yellow'>knowledge</Label></span>
                <span><Label as='span' size='small' color='green'>products</Label></span>
                <span><Label as='span' size='small' color='blue'>services</Label></span>
              </TextLoop>
            </div>
            <div className='fb-desc-row'>⭐️ find/receive help in your <Label as='span' color='violet' size='small'>neighbourhood</Label></div>
            <div className='fb-desc-row'>⭐️ happy <Label as='span' size='small' color='olive'>exchanging</Label></div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
