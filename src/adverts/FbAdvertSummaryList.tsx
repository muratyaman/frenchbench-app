import { Grid } from 'semantic-ui-react';
import { FbHashTagLinkList } from '../components';
import { FbAdvertSummary } from './FbAdvertSummary';

export function FbAdvertSummaryList({ api, i18n, adverts = []}) {
  if (adverts && adverts.length) {
    const advertColumns = adverts.map(advert => {
      const summary = <FbHashTagLinkList tags={advert.tags} />;
      return (
        <Grid.Column mobile={16} tablet={8} computer={8} key={`${advert.id}`}>
          <FbAdvertSummary api={api} i18n={i18n} advert={advert} summary={summary} />
        </Grid.Column>
      );
    });
    return <Grid>{advertColumns}</Grid>;
  }
  return (
    <div>no adverts found</div>
  )
}
