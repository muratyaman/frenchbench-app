import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbArticleListItem } from './FbArticleListItem';

export function FbArticleList({ articles = []}) {
  if (articles && articles.length) {
    const columns = articles.map(article => (
      <Grid.Column mobile={16} tablet={8} computer={5} key={`${article.id}`}>
        <FbArticleListItem article={article} />
      </Grid.Column>
    ));
    return <Grid stackable>{columns}</Grid>;
  }
  return (
    <div>no articles found</div>
  )
}
