import React, { useContext } from 'react';
import { Segment } from 'semantic-ui-react';
import { RandomImage } from '../components';
import { FbI18nContext } from '../contexts';

export const FbGreatYouHere = () => {
  const { i18n } = useContext(FbI18nContext);
  return (
    <Segment className='fb-rand-img'>
      <RandomImage keywords='welcome' />
      <p align='center'>{i18n.account_great_you_here()}</p>
    </Segment>
  );
}
