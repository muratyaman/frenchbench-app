// TODO: keep this file generic
import React from 'react';

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

export const defaultContext = {
  lastError: null,
  lastMessage: null,
  send: () => {},
  socketStatus: SOCKET_STATUS_LABELS[SOCKET_STATUS_UNKNOWN],
  socketStatusFlags: () => {},
};

export const WebSocketContext = React.createContext(defaultContext);

export class WebSocketContextProvider extends React.Component {

  constructor(props) {
    console.log('WebSocketContextProvider.constructor');
    super(props);
    this.ws = null;
    this.unmounting = false;
    this.ses = null;
    this.state = {
      ...defaultContext,
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
    console.log('WebSocketContextProvider.onOpen', ev);
    this.updateStatus();
  }

  onError = (ev) => {
    console.log('WebSocketContextProvider.onError', ev);
    this.updateStatus();
  }

  onMessage = (ev) => {
    console.log('WebSocketContextProvider.onMessage', ev);
    this.setState({ lastMessage: ev.data });
    const { onMessage } = this.props;
    if (onMessage) {
      setTimeout(() => onMessage(ev.data), 500); // trigger later
    }
  }

  onClose = (ev) => {
    console.log('WebSocketContextProvider.onClose', ev);
    this.setState({ socketStatus: this.getSocketStatus() });
  }

  componentDidMount() {
    console.log('WebSocketContextProvider.componentDidMount');
    this.open();
  }

  // command to open websocket
  open = () => {
    console.log('WebSocketContextProvider.open');
    try {
      const { url } = this.props; // e.g. 'ws://localhost:3000/ws'
      this.ws = new WebSocket(url);
      this.ws.onopen    = this.onOpen;
      this.ws.onmessage = this.onMessage;
      this.ws.onerror   = this.onError;
      this.ws.onclose   = this.onClose;
    } catch (err) {
      console.error('WebSocketContextProvider.open ERROR', err);
      this.setState({ lastError: err.message });
    }
  }

  // command to send message
  send = (msg) => {
    console.log('WebSocketContextProvider.send', msg);
    if (this.ws) {
      try {
        this.ws.send(msg);
      } catch (err) {
        console.error('WebSocketContextProvider.send ERROR', err);
        this.setState({ lastError: err.message });
      }
    }
  }

  // command to close websocket
  close = () => {
    console.log('WebSocketContextProvider.close');
    if (this.ws) {
      try {
        this.ws.close();
      } catch (err) {
        console.error('WebSocketContextProvider.close ERROR', err);
        if (!this.unmounting) {
          this.setState({ lastError: err.message });
        }
      }
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
    this.close();
  }

  componentDidUpdate(prevProps) {
    const { url, message } = this.props;
    if (prevProps.url !== url) {
      this.close();
      this.open();
    } else if (prevProps.message !== message) { // we can send message by changing 'message' property
      this.send(message);
    }
  }

  render() {
    return (
      <WebSocketContext.Provider value={this.state}>
        {this.props.children}
      </WebSocketContext.Provider>
    );
  }
}
