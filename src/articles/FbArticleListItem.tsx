import { FC, PropsWithChildren} from 'react';
import { formatDistance } from 'date-fns';
import { Label } from 'semantic-ui-react';
import { FbLink } from '../components';
import { makeArticleLink } from '../makeRoutes';
import { ArticleSummaryModel } from '../utils';

export interface FbArticleListItemProps  {
  article: ArticleSummaryModel;
}

export const FbArticleListItem: FC<FbArticleListItemProps> = (props: PropsWithChildren<FbArticleListItemProps>) => {
  const { id, title, slug, keywords, created_at, updated_at, assets = [] } = props.article;
  const dt_created = formatDistance(new Date(created_at), new Date());
  const dt_updated = formatDistance(new Date(updated_at), new Date());
  const linkToRead = makeArticleLink({ slug });
  const linkToEdit = '/app/my/articles/article/' + id;
  return (
    <div className='fb-article-list-item'>
      <h3>{title}</h3>
      <p>
        Slug: {slug}<br />
        Keywords: {keywords}<br />
        Created: {dt_created} ago<br />
        Updated {dt_updated} ago<br />
      </p>
      <p>
        <FbLink to={linkToRead}><Label color='purple'>Read</Label></FbLink>
        <FbLink to={linkToEdit}><Label color='black'>Edit</Label></FbLink>
      </p>
    </div>
  );
}
