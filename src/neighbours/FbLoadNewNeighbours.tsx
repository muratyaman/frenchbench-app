import React from 'react';
import { FbNewNeighbours } from './FbNewNeighbours';

// NOTE: use only after mounting on client side
export function FbLoadNewNeighbours(props) {
  return (
    <div className='fb-post-search'>
      <FbNewNeighbours {...props} />
    </div>
  );
}
