import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbPostListItem } from './FbPostListItem';

export function FbPostList({ posts = []}) {
  if (posts && posts.length) {
    return (
      <Grid stackable>
        {posts.map((post, idx) => (
          <Grid.Column mobile={16} tablet={8} computer={5} key={`${post.id}-${idx}`}>
            <FbPostListItem {...post} />
          </Grid.Column>
        ))}
      </Grid>
    )
  }
  return (
    <div>no posts found</div>
  )
}
