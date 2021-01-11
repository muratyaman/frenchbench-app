import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbGridCardContainer } from '../components';

export function ErrorPage({ i18n, message }) {
  return (
    <PublicLayout title={i18n.common_error()} code='error'>
      <FbGridCardContainer>
        {message}
      </FbGridCardContainer>
    </PublicLayout>
  );
}
