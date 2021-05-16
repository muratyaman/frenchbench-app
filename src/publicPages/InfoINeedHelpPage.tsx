import { FC, PropsWithChildren } from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardHelpNeeded, FbCardIdea } from '../content';
import { FbGridCardContainer } from '../components';
import { FbCurrentUserNotRequired } from '../users/FbCurrentUserNotRequired';
import { AppPageProps } from '../types';

export type InfoINeedHelpPageProps = AppPageProps;

export const InfoINeedHelpPage: FC<InfoINeedHelpPageProps> = (props: PropsWithChildren<InfoINeedHelpPageProps>) => {
  const { i18n } = props;
  const layoutProps = { title: 'I Need Help' };
  return (
    <PublicLayout {...layoutProps}>
      <FbGridCardContainer>
        <FbCardHelpNeeded i18n={i18n} />
      </FbGridCardContainer>
      
      <FbGridCardContainer>
        <FbCardIdea title={i18n._('ideas_neighbourless')} keywords='neighbor' idea={i18n._('ideas_neighbourless_quote')} />
      </FbGridCardContainer>

      <FbCurrentUserNotRequired>
        <FbGridCardContainer>
          <FbCallToAccount i18n={i18n} />
        </FbGridCardContainer>
      </FbCurrentUserNotRequired>
    </PublicLayout>
  );
}
