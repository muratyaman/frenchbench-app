import { FC, PropsWithChildren } from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardCommunity, FbCardIdea } from '../content';
import { FbGridCardContainer } from '../components';
import { FbCurrentUserNotRequired } from '../users/FbCurrentUserNotRequired';
import { AppPageProps } from '../types';

export type IndexPageProps = AppPageProps;

export const IndexPage: FC<IndexPageProps> = (props: PropsWithChildren<IndexPageProps>) => {
  const { i18n } = props;
  const layoutProps = { title: 'Home' };
  return (
    <PublicLayout {...layoutProps}>
      <FbGridCardContainer>
        <h1>{i18n._('home_welcome')}</h1>
        <FbCardCommunity i18n={i18n} />
      </FbGridCardContainer>

      <FbGridCardContainer>
        <FbCardIdea title={i18n._('ideas_loneliness')} keywords='loneliness' idea={i18n._('ideas_loneliness_quote')} />
      </FbGridCardContainer>

      <FbGridCardContainer>
        <FbCardIdea title={i18n._('ideas_neighbourless')} keywords='neighbor' idea={i18n._('ideas_neighbourless_quote')} />
      </FbGridCardContainer>

      <FbGridCardContainer>
        <FbCardIdea title={i18n._('ideas_strangers')} keywords='friend' idea={i18n._('ideas_strangers_quote')} />
      </FbGridCardContainer>

      <FbCurrentUserNotRequired>
        <FbGridCardContainer>
          <FbCallToAccount i18n={i18n} />
        </FbGridCardContainer>
      </FbCurrentUserNotRequired>
    </PublicLayout>
  );
}
