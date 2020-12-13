import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbHashTagLinkList } from './FbHashTagLinkList';
import { FbAdvertSummary } from './FbAdvertSummary';

export function FbAdvertSummaryList({ adverts = []}) {
  if (adverts && adverts.length) {
    const advertColumns = adverts.map(advert => {
      const summary = <FbHashTagLinkList tags={advert.tags} />
      return (
        <Grid.Column mobile={16} tablet={8} computer={8} key={`${advert.id}`}>
          <FbAdvertSummary {...advert} summary={summary} />
        </Grid.Column>
      )
    });
    return <Grid>{advertColumns}</Grid>;
  }
  return (
    <div>no adverts found</div>
  )
}
