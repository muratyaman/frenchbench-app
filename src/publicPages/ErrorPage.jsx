import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';

export function ErrorPage({ i18n, message }) {
  return (
    <PublicLayout title={i18n.common_error()} code='error'>
      {message}
    </PublicLayout>
  );
}
