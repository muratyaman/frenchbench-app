import React from 'react';

/**
 * render children only on client-side
 * @param {*} param0 
 */
export function FbClientSideContainer({ children }) {
  if (window && window.navigator) {
    return (
      <>
        {children}
      </>
    );
  }
  return null;
}
