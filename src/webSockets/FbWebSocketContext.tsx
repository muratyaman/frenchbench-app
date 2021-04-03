import { Component, createContext } from 'react';
import * as wsUtils from './wsUtils';

export interface FbWebSocketContextProviderProps {
  url: string;
  onMessage?: (msgObj: any) => void;
}

export interface FbWebSocketContextType {
  lastError: string | null;
  lastMessage: any | null;
  messages: wsUtils.FbWsMessage[];
  open: () => void;
  close: () => void;
  send: (msgObj: any) => void;
  socketStatus: String;
  socketStatusFlags: () => wsUtils.FbWsStatusFlags;
}

export const WS_defaultContext: FbWebSocketContextType = {
  lastError: null,
  lastMessage: null,
  messages: [],
  open: () => {},
  close: () => {},
  send: (msgObj: wsUtils.FbWsMessage) => {},
  socketStatus: wsUtils.SOCKET_STATUS_LABELS[wsUtils.SOCKET_STATUS_ENUM.UNKNOWN],
  socketStatusFlags: () => wsUtils.fbStatusFlagsDefault,
};

export const FbWebSocketContext = createContext<FbWebSocketContextType>(WS_defaultContext);

export const FbWebSocketContextConsumer = FbWebSocketContext.Consumer; // alias

export class FbWebSocketContextProvider extends Component<FbWebSocketContextProviderProps, FbWebSocketContextType> {

  ws = null;
  unmounting = false;
  sesId = null;
  timerId = null;

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

  getStatusIdx = () => this.ws ? this.ws.readyState : null;

  getSocketStatus = () => {
    return wsUtils.getSocketStatusLabel(this.getStatusIdx());
  }

  socketStatusFlags = () => {
    return wsUtils.getSocketStatusFlags(this.getStatusIdx());
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
    const msgObj: wsUtils.FbWsMessage | null = JSON.parse(ev.data);
    if (msgObj) { // parsed

      if (msgObj.kind) { // we have a custom protocol
        if(msgObj.kind === wsUtils.MSG_KIND_ENUM.SES) { // special msg
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
  send = (msgObj: wsUtils.FbWsNewChatMessage) => {
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
