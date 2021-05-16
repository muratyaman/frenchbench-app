import { FC, PropsWithChildren } from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbGridCardContainer } from '../components';
import { AppPageProps } from '../types';

export type ErrorPageProps = AppPageProps & { message: string; }

export const ErrorPage: FC<ErrorPageProps> = (props: PropsWithChildren<ErrorPageProps>) => {
  const { i18n, message } = props;
  return (
    <PublicLayout title={i18n._('common_error')} code='error'>
      <FbGridCardContainer>
        {message}
      </FbGridCardContainer>
    </PublicLayout>
  );
}
