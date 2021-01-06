import React from 'react';
import { Segment } from 'semantic-ui-react';
import { RandomImage } from '../components';

export const FbGreatYouHere = ({ i18n }) => {
  return (
    <Segment className='fb-rand-img'>
      <RandomImage keywords='welcome' />
      <p align='center'>{i18n.account_great_you_here()}</p>
    </Segment>
  );
}
