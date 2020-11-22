import React from 'react';
import { Segment } from 'semantic-ui-react';
import { RandomImage } from './RandomImage';
import { I18N_KEYS } from '../utils/i18n';

export const FbGreatYouHere = ({ i18n }) => {
  return (
    <Segment className='fb-rand-img'>
      <RandomImage keywords='welcome' />
      <p align='center'>{i18n._(I18N_KEYS.account_great_you_here)}</p>
    </Segment>
  );
}
