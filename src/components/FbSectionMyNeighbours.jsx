import React from 'react';
import { FbNewNeighbours } from './FbNewNeighbours';
import { FbChat } from './FbChat';

// NOTE: use only after mounting on client side
export function FbSectionMyNeighbours(props) {
  //const { api, currentUserState, wsMessages, wsSesId } = props;
  //const { data: user = null } = currentUserState ?? {};
  return (
    <div className='fb-post-search'>
      <FbNewNeighbours {...props} />
      <FbChat {...props} />
    </div>
  );
}
