import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbPostListItem } from './FbPostListItem';

export function FbPostList({ posts = []}) {
  if (posts && posts.length) {
    const postColumns = posts.map(post => (
      <Grid.Column mobile={16} tablet={8} computer={5} key={`${post.id}`}>
        <FbPostListItem {...post} />
      </Grid.Column>
    ));
    return <Grid stackable>{postColumns}</Grid>;
  }
  return (
    <div>no posts found</div>
  )
}
