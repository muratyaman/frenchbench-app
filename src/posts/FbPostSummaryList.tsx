import { Grid } from 'semantic-ui-react';
import { FbHashTagLinkList } from '../components';
import { FbPostSummary } from './FbPostSummary';

export function FbPostSummaryList({ posts = []}) {
  if (posts && posts.length) {
    const postColumns = posts.map(post => {
      const summary = <FbHashTagLinkList tags={post.tags} />
      return (
        <Grid.Column mobile={16} tablet={8} computer={8} key={`${post.id}`}>
          <FbPostSummary {...post} summary={summary} />
        </Grid.Column>
      )
    });
    return <Grid>{postColumns}</Grid>;
  }
  return (
    <div>no posts found</div>
  );
}
