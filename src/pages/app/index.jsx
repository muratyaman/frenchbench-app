import React from 'react';
import Router from 'next/router';

function ProtectedIndex(props) {
  setTimeout(() => { Router.push('/app/my/home'); }, 500);
  console.log('ProtectedIndex redirecting...');
  return (
    <div>redirecting...</div>
  );
}

export default ProtectedIndex;
