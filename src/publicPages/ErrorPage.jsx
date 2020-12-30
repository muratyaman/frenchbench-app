import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';

export function ErrorPage({ message }) {
  return (
    <PublicLayout title='Error' code='error'>
      {message}
    </PublicLayout>
  );
}
