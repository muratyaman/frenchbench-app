import { useContext } from 'react';
import { FbCurrentUserContext } from './FbCurrentUserContext';

export function FbCurrentUserNotRequired({ render = null, children }) {
  const currentUserState = useContext(FbCurrentUserContext);
  if (!currentUserState || !currentUserState.data) {
    return (
      <>
        {render ? render(currentUserState) : children}
      </>
    );
  }
  return null;
}
