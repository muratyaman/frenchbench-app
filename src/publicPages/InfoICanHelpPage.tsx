import { FC, PropsWithChildren } from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardHelpProvided, FbCardIdea } from '../content';
import { FbGridCardContainer } from '../components';
import { FbCurrentUserNotRequired } from '../users/FbCurrentUserNotRequired';
import { AppPageProps } from '../types';

export type InfoICanHelpPageProps = AppPageProps;

export const InfoICanHelpPage: FC<InfoICanHelpPageProps> = (props: PropsWithChildren<InfoICanHelpPageProps>) => {
  const { i18n } = props;
  const layoutProps = { title: 'I Can Help' };
  return (
    <PublicLayout {...layoutProps}>
      <FbGridCardContainer>
        <FbCardHelpProvided i18n={i18n} />
      </FbGridCardContainer>

      <FbGridCardContainer>
        <FbCardIdea title={i18n._('ideas_true_neighbour')} keywords='neighbor' idea={i18n._('ideas_true_neighbour_quote')} />
      </FbGridCardContainer>

      <FbCurrentUserNotRequired>
        <FbGridCardContainer>
          <FbCallToAccount i18n={i18n} />
        </FbGridCardContainer>
      </FbCurrentUserNotRequired>
    </PublicLayout>
  );
}
