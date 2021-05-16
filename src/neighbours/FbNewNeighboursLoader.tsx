import { FbNewNeighbours } from './FbNewNeighbours';

// NOTE: use only after mounting on client side
export function FbNewNeighboursLoader(props) {
  return (
    <div className='fb-post-search'>
      <FbNewNeighbours {...props} />
    </div>
  );
}
