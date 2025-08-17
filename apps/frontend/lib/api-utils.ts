// Environment-aware API URL function
export const getAPIUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' 
      ? 'http://localhost:3009'
      : 'https://api.syncsketch.praverbajaj.tech';
  }
  return process.env.NODE_ENV === 'production' 
    ? 'https://api.syncsketch.praverbajaj.tech'
    : 'http://localhost:3009';
};

// WebSocket URL function
export const getWSUrl = () => {
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost';
    return isLocalhost ? 'ws://localhost:8080' : 'wss://ws.syncsketch.praverbajaj.tech';
  }
  return process.env.NODE_ENV === 'production' 
    ? 'wss://ws.syncsketch.praverbajaj.tech'
    : 'ws://localhost:8080';
};