import React from 'react';
import { Icon } from 'semantic-ui-react';

export function Loading(props) {
  return (
    <div className='fb-loading'>
      <h3><Icon name='spinner' size='large' loading /> Loading...</h3>
    </div>
  )
}
