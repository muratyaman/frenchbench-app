import React from 'react';
import { FbNewNeighbours } from './FbNewNeighbours';
import { FbChat } from './FbChat';

// NOTE: use only after mounting on client side
export function FbSectionMyNeighbours(props) {
  return (
    <div className='fb-post-search'>
      <FbNewNeighbours {...props} />
      <FbChat {...props} />
    </div>
  );
}
