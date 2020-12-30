import React from 'react';
import { formatDistance } from 'date-fns';
import { Label } from 'semantic-ui-react';
import { FbLink } from '../components';
import { makeArticleLink } from '../utils/makeArticleLink';

export function FbArticleListItem({ id, title, slug, keywords, created_at, updated_at, assets = [] }) {
  const dt_created = formatDistance(new Date(created_at), new Date());
  const dt_updated = formatDistance(new Date(updated_at), new Date());
  const linkToRead = makeArticleLink({ id, slug });
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
