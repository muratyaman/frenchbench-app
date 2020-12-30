import React from 'react';
import { FbNewNeighbours } from '../components';
import { FbChat } from '../chat/FbChat';

// NOTE: use only after mounting on client side
export function FbSectionMyNeighbours(props) {
  return (
    <div className='fb-post-search'>
      <FbNewNeighbours {...props} />
      <FbChat {...props} />
    </div>
  );
}
