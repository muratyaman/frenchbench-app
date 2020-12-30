import React from 'react';
import { FbLoadingParagraph } from '../components';
import { FbArticleEditor } from './FbArticleEditor';
import { useArticleByIdToEdit } from '../hooks/useArticleByIdToEdit';

export function FbSectionMyArticle({ api, i18n, slug, articleId }) {
  const { data: article = null, loading = false, error = null } = useArticleByIdToEdit(api, articleId);
  return (
    <div className='fb-article-editor'>
      { loading && <FbLoadingParagraph /> }
      { error && <p>Error loading article</p>}
      { article && <FbArticleEditor article={article} api={api} i18n={i18n} />}
    </div>
  );
}
