import { Grid } from 'semantic-ui-react';
import { FbAdvertListItem } from './FbAdvertListItem';

export function FbAdvertList({ api, i18n, adverts = []}) {
  if (adverts && adverts.length) {
    const advertColumns = adverts.map(advert => (
      <Grid.Column mobile={16} tablet={8} computer={5} key={`${advert.id}`}>
        <FbAdvertListItem api={api} i18n={i18n} advert={advert} />
      </Grid.Column>
    ));
    return <Grid stackable>{advertColumns}</Grid>;
  }
  return (
    <div>no adverts found</div>
  )
}
