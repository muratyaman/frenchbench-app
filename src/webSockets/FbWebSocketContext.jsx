import React from 'react';

export const MSG_KIND_SES    = 'ses'; // connected, server => session ID => client
export const MSG_KIND_GEO    = 'geo'; // geolocation update
export const MSG_KIND_JOINED = 'joined';
export const MSG_KIND_LEFT   = 'left';
export const MSG_KIND_CHAT   = 'chat';

export const SOCKET_STATUS_UNKNOWN = -1;

// @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
export const SOCKET_STATUS_CONNECTING = 0; // Socket has been created. The connection is not yet open.
export const SOCKET_STATUS_OPEN       = 1; // The connection is open and ready to communicate.
export const SOCKET_STATUS_CLOSING    = 2; // The connection is in the process of closing.
export const SOCKET_STATUS_CLOSED     = 3; // The connection is closed or couldn't be opened.

export const SOCKET_STATUS_LABELS = {
  [SOCKET_STATUS_UNKNOWN]:    'unknown',
  [SOCKET_STATUS_CONNECTING]: 'connecting',
  [SOCKET_STATUS_OPEN]:       'open',
  [SOCKET_STATUS_CLOSING]:    'closing',
  [SOCKET_STATUS_CLOSED]:     'closed',
};

export const WS_defaultContext = {
  lastError: null,
  lastMessage: null,
  messages: [],
  send: () => {},
  socketStatus: SOCKET_STATUS_LABELS[SOCKET_STATUS_UNKNOWN],
  socketStatusFlags: () => {},
};

export const FbWebSocketContext = React.createContext(WS_defaultContext);

export const FbWebSocketContextConsumer = FbWebSocketContext.Consumer; // alias

export class FbWebSocketContextProvider extends React.Component {

  constructor(props) {
    super(props);
    this.ws = null;
    this.unmounting = false;
    this.sesId = null;
    this.timerId = null;
    this.state = {
      ...WS_defaultContext,
      open: this.open,
      close: this.close,
      send: this.send,
      socketStatusFlags: this.socketStatusFlags, // function easier to use
    };
  }

  getSocketStatus = () => {
    return this.ws && SOCKET_STATUS_LABELS[this.ws.readyState] ? SOCKET_STATUS_LABELS[this.ws.readyState] : 'unknown';
  }

  socketStatusFlags = () => {
    const idx = this.ws ? this.ws.readyState : SOCKET_STATUS_UNKNOWN;
    return {
      isUnknown:    idx === SOCKET_STATUS_UNKNOWN,
      isConnecting: idx === SOCKET_STATUS_CONNECTING,
      isOpen:       idx === SOCKET_STATUS_OPEN,
      isClosing:    idx === SOCKET_STATUS_CLOSING,
      isClosed:     idx === SOCKET_STATUS_CLOSED,
    };
  }

  updateStatus = () => {
    this.setState({ socketStatus: this.getSocketStatus() });
  }

  onOpen = (ev) => {
    this.updateStatus();
  }

  onError = (ev) => {
    console.log('FbWebSocketContextProvider.onError', ev);
    this.updateStatus();
  }

  onMessage = (ev) => {
    console.log('FbWebSocketContextProvider.onMessage event.data', ev.data);
    const { messages } = this.state;
    const msgObj = JSON.parse(ev.data);
    if (msgObj) { // parsed

      if (msgObj.kind) { // we have a custom protocol
        if(msgObj.kind === MSG_KIND_SES) { // special msg
          if (msgObj.ses) this.sesId = msgObj.ses; // capture session ID
        } else {
          this.setState({ lastMessage: msgObj, messages: [ ...messages, msgObj ] });
        }
      }
      
      const { onMessage } = this.props;
      if (onMessage) {
        setTimeout(() => onMessage(msgObj), 500); // trigger later
      }
    }
  }

  onClose = (ev) => {
    console.log('FbWebSocketContextProvider.onClose', ev);
    this.setState({ socketStatus: this.getSocketStatus() });
  }

  componentDidMount() {
    if (window) { // client-side only
      this.open();
      this.timerId = setTimeout(this.retry, 30 * 1000); // every 30 seconds try to reconnect
    }
  }

  retry = () => {
    const { isOpen } = this.socketStatusFlags();
    if (!isOpen) {
      console.log('FbWebSocketContextProvider.retry() => websocket is not open yet');
      this.open();
    }
  }

  // command to open websocket
  open = () => {
    console.log('FbWebSocketContextProvider.open');
    try {
      const { url } = this.props; // e.g. 'ws://localhost:3000/ws'
      this.ws = new WebSocket(url);
      this.ws.onopen    = this.onOpen;
      this.ws.onmessage = this.onMessage;
      this.ws.onerror   = this.onError;
      this.ws.onclose   = this.onClose;
    } catch (err) {
      console.error('FbWebSocketContextProvider.open ERROR', err);
      this.setState({ lastError: err.message });
    }
  }

  // command to send message
  send = (msgObj) => {
    console.log('WebSocketContextProvider.send', msgObj);
    if (this.ws) {
      try {
        msgObj.ses = this.sesId;
        this.ws.send(JSON.stringify(msgObj));
      } catch (err) {
        console.error('WebSocketContextProvider.send ERROR', err);
        this.setState({ lastError: err.message });
      }
    }
  }

  // command to close websocket
  close = () => {
    console.log('FbWebSocketContextProvider.close');
    if (this.ws) {
      try {
        this.ws.close();
        this.ws = null;
      } catch (err) {
        console.error('FbWebSocketContextProvider.close ERROR', err);
        if (!this.unmounting) {
          this.setState({ lastError: err.message });
        }
      }
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
    this.close();
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (prevProps.url !== url) {
      this.close();
      this.open();
    }
  }

  render() {
    return (
      <FbWebSocketContext.Provider value={this.state}>
        {this.props.children}
      </FbWebSocketContext.Provider>
    );
  }
}
