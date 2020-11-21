import React from 'react';
import { Icon } from 'semantic-ui-react';

export function Loading({ content = 'Loading...' }) {
  return (
    <div className='fb-loading'>
      <h3><Icon name='spinner' size='large' loading />{content}</h3>
    </div>
  )
}
