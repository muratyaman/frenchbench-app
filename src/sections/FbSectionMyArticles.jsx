import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbArticleList } from './FbArticleList';
import { useArticleSearch } from '../hooks/useArticleSearch';

export function FbSectionMyArticles({ api, currentUserState }) {
  const { data: user = null } = currentUserState ?? {};
  const { id: user_id = null } = user ?? {};
  const { data: articles = [], loading = false, error = null } = useArticleSearch(api, { user_id, with_assets: true });
  return (
    <div className='fb-post-search'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading articles</p>}
      { articles && <FbArticleList articles={articles} />}
    </div>
  );
}
