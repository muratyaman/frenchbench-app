export enum MSG_KIND_ENUM {
  SES    = 'ses', // connected, server => session ID => client
  GEO    = 'geo', // geolocation update
  JOINED = 'joined',
  LEFT   = 'left',
  CHAT   = 'chat',
}

export interface FbWsMessage {
  kind: MSG_KIND_ENUM;
  id: string;
  ts: string;
  by: string;
  msg: string;
  ses?: string;
}

export interface FbWsNewChatMessage {
  kind: MSG_KIND_ENUM;
  ts: string;
  msg: string;
  ses?: string;
}

export enum SOCKET_STATUS_ENUM {
  UNKNOWN    = 999,
  // @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
  CONNECTING = 0, // Socket has been created. The connection is not yet open.
  OPEN       = 1, // The connection is open and ready to communicate.
  CLOSING    = 2, // The connection is in the process of closing.
  CLOSED     = 3, // The connection is closed or couldn't be opened.
}

export const SOCKET_STATUS_LABELS = {
  [SOCKET_STATUS_ENUM.UNKNOWN]:    'unknown',
  [SOCKET_STATUS_ENUM.CONNECTING]: 'connecting',
  [SOCKET_STATUS_ENUM.OPEN]:       'open',
  [SOCKET_STATUS_ENUM.CLOSING]:    'closing',
  [SOCKET_STATUS_ENUM.CLOSED]:     'closed',
};

export interface FbWsStatusFlags {
  isUnknown: boolean;
  isConnecting: boolean;
  isOpen: boolean;
  isClosing: boolean;
  isClosed: boolean;
}

export function getSocketStatusLabel(idx: number | null) {
  return SOCKET_STATUS_LABELS[idx]
    ? SOCKET_STATUS_LABELS[idx]
    : SOCKET_STATUS_LABELS[SOCKET_STATUS_ENUM.UNKNOWN];
}

export const fbStatusFlagsDefault: FbWsStatusFlags = {
  isUnknown: true,
  isConnecting: false,
  isOpen: false,
  isClosing: false,
  isClosed: false,
};

export function getSocketStatusFlags(idx: number | null): FbWsStatusFlags {
  return {
    ...fbStatusFlagsDefault,
    isConnecting: idx === SOCKET_STATUS_ENUM.CONNECTING,
    isOpen:       idx === SOCKET_STATUS_ENUM.OPEN,
    isClosing:    idx === SOCKET_STATUS_ENUM.CLOSING,
    isClosed:     idx === SOCKET_STATUS_ENUM.CLOSED,
  };
}
