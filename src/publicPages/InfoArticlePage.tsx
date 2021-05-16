import { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbGridCardContainer, FbLoading } from '../components';
import { FbArticle } from '../articles/FbArticle';
import { useArticleBySlug } from '../hooks/useArticleBySlug';
import { AppPageProps } from '../types';

export type InfoArticlePageProps = AppPageProps;

// TODO deprecated
export const InfoArticlePage: FC<InfoArticlePageProps> = (props: PropsWithChildren<InfoArticlePageProps>) => {
  const { api, i18n, ssr = false, hydrating = false, ssrData = {}, initialState = {} } = props;
  const params = useParams();
  const { InfoArticlePage: initialData = {}, slug: initialSlug } = initialState ?? {};
  const slug = initialSlug ? initialSlug : (ssr ? ssrData.slug : params.slug);
  const data = { ...ssrData, ...initialData };
  const csData = useArticleBySlug(api, ssr, hydrating, slug, data);
  const { loading, data: article = null } = csData;
  const title = article && article.title ? article.title : 'Article...';
  const layoutProps = { title };
  return (
    <PublicLayout {...layoutProps}>
      <FbGridCardContainer>
        {loading && <FbLoading />}
        {!loading && !article && <p>{i18n._('article_not_found')}</p>}
        {!loading && article && (<FbArticle {...article} />)}
      </FbGridCardContainer>
    </PublicLayout>
  );
}
