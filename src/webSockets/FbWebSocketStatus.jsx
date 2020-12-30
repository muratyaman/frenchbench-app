import React, { useContext } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { FbWebSocketContext } from './FbWebSocketContext';

export function FbWebSocketStatus() {
  const { lastError, socketStatus, socketStatusFlags } = useContext(FbWebSocketContext);
  const name = 'wifi';
  let message = socketStatus, color = 'grey';
  const { isUnknown, isConnecting, isOpen, isClosing, isClosed } = socketStatusFlags();
  if (isUnknown) {
    message = 'Connection status is unknown.';
    color = 'grey';
  }
  if (isConnecting) {
    message = 'We are connecting.';
    color = 'yellow';
  }
  if (isOpen) {
    message = 'We are connected.';
    color = 'green';
  }
  if (isClosing) {
    message = 'We are disconnecting.';
    color = 'orange';
  }
  if (isClosed) {
    message = 'We are disconnected.';
    color = 'red';
  }
  if (lastError) {
    message += ' There was an error: ' + lastError;
  }
  const iconProps = { name, color };
  const icon = (<Icon {...iconProps} aria-label={message} />);
  return (
    <Popup on={['hover', 'click']} trigger={icon}>
      {message}
    </Popup>
  )
}