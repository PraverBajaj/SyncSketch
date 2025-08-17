// Environment-aware API URL function
export const getAPIUrl = () => {
  // Always check if we're in browser first
  if (typeof window !== 'undefined') {
    // Check the actual hostname from browser
    const hostname = window.location.hostname;
    console.log('Current hostname:', hostname); // Debug log
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      console.log('Using localhost API'); // Debug log
      return 'http://localhost:3009';
    } else {
      console.log('Using production API'); // Debug log
      return 'https://api.syncsketch.praverbajaj.tech';
    }
  }
  
  // Server-side fallback
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