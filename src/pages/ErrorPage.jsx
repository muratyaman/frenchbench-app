import React from 'react';
import { PublicLayout } from '../components';

export function ErrorPage({ message }) {
  return (
    <PublicLayout title='Error' code='error'>
      {message}
    </PublicLayout>
  );
}
