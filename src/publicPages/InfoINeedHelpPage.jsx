import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardHelpNeeded, FbCardIdea } from '../content';
import { FbGridCardContainer } from '../components';
import { FbCurrentUserNotRequired } from '../users/FbCurrentUserNotRequired';

export function InfoINeedHelpPage({ api, i18n }) {
  const layoutProps = { title: 'I Need Help' };
  return (
    <PublicLayout {...layoutProps}>
      <FbGridCardContainer>
        <FbCardHelpNeeded i18n={i18n} />
      </FbGridCardContainer>
      
      <FbGridCardContainer>
        <FbCardIdea title={i18n.ideas_neighbourless()} keywords='neighbor' idea={i18n.ideas_neighbourless_quote()} />
      </FbGridCardContainer>

      <FbCurrentUserNotRequired>
        <FbGridCardContainer>
          <FbCallToAccount i18n={i18n} />
        </FbGridCardContainer>
      </FbCurrentUserNotRequired>
    </PublicLayout>
  );
}
