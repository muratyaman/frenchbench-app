import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { RandomImage } from './RandomImage';

export function FbCardCommunity(props) {
  return (
    <div className='fb-card-community'>
      <Card>
        <RandomImage keywords='community' />
        <Card.Content>
          <Card.Header>FrenchBench Communities</Card.Header>
          <Card.Description>
            <div>⭐️ relevant and <Label as='span' color='red' size='small'>local</Label>.</div>
            <div>
              <span>⭐️ keep helping with your&nbsp;</span>
              <TextLoop>
                <span><Label as='span' size='small' color='orange'>time</Label></span>
                <span><Label as='span' size='small' color='yellow'>knowledge</Label></span>
                <span><Label as='span' size='small' color='green'>products</Label></span>
                <span><Label as='span' size='small' color='blue'>services</Label></span>
              </TextLoop>
              <span>&nbsp;.</span>
            </div>
            <div>⭐️ find/receive help in your <Label as='span' color='violet' size='small'>neighbourhood</Label>.</div>
            <div>⭐️ happy <Label as='span' size='small' color='purple'>exchanging</Label>!</div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
