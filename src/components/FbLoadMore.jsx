import React from 'react';
import { Button } from 'semantic-ui-react';

export function FbLoadMore({ content = 'Load More', onClick, loading = false, ...overrides }) {
  return (
    <div className='fb-load-more'>
      <Button type='button' content={content} onClick={onClick} loading={loading} disabled={loading}
        icon='chevron circle down' labelPosition='right' {...overrides} />
    </div>
  )
}