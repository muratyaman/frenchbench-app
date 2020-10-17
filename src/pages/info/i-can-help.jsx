import React from 'react';
import { FbCallToAccount, FbCardHelpProvided, PublicLayout } from '../../components';

function INeedHelp(props) {
  return (
    <PublicLayout>
      <FbCardHelpProvided />
      <FbCallToAccount />
    </PublicLayout>
  )
}

export default INeedHelp;
