import React from 'react';
import { FbCallToAccount, FbCardHelpNeeded, PublicLayout } from '../../components';

function ICanHelp(props) {
  return (
    <PublicLayout>
      <FbCardHelpNeeded />
      <FbCallToAccount />
    </PublicLayout>
  )
}

export default ICanHelp;
