import { Segment } from 'semantic-ui-react';
import { FbRandomImage } from '../components';

export const FbGreatYouHere = ({ i18n }) => {
  return (
    <Segment className='fb-rand-img'>
      <FbRandomImage keywords='welcome' />
      <p>{i18n._('account_great_you_here')}</p>
    </Segment>
  );
}
