import { useContext } from 'react';
import { Icon, Popup, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';
import { FbI18nContext } from '../contexts';
import { FbWebSocketContext } from './FbWebSocketContext';

export function FbWebSocketStatus() {
  const { lastError, socketStatus, socketStatusFlags } = useContext(FbWebSocketContext);
  const { i18n } = useContext(FbI18nContext);
  const name: SemanticICONS = 'wifi';
  let message = socketStatus, color: SemanticCOLORS = 'grey';
  const { isUnknown, isConnecting, isOpen, isClosing, isClosed } = socketStatusFlags();
  if (isUnknown) {
    message = i18n._('ws_status_unknown');
    color = 'grey';
  }
  if (isConnecting) {
    message = i18n._('ws_status_connecting');
    color = 'yellow';
  }
  if (isOpen) {
    message = i18n._('ws_status_open');
    color = 'green';
  }
  if (isClosing) {
    message = i18n._('ws_status_closing');
    color = 'orange';
  }
  if (isClosed) {
    message = i18n._('ws_status_closed');
    color = 'red';
  }
  if (lastError) {
    message += i18n._('ws_status_error') + lastError;
  }
  const iconProps = { name, color };
  const icon = (<Icon {...iconProps} ariaLabel={message} />);
  return (
    <Popup on={['hover', 'click']} trigger={icon}>
      {message}
    </Popup>
  );
}
