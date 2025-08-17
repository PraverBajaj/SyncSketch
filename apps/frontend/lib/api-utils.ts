// Environment-aware API URL function
export const getAPIUrl = () => {
  // Always use production API
  return 'https://api.syncsketch.praverbajaj.tech';
  
  // 🔧 UNCOMMENT FOR LOCAL DEVELOPMENT:
  // return 'http://localhost:3009';
};

// WebSocket URL function
// 🔧 CHANGE THIS FOR LOCAL DEVELOPMENT:
// For local development, change the return value below to: 'ws://localhost:8080'
// For production, keep it as: 'wss://ws.syncsketch.praverbajaj.tech'

export const getWSUrl = () => {
  // Always use production WebSocket (works for both local and production)
  return 'wss://ws.syncsketch.praverbajaj.tech';
  
  // 🔧 UNCOMMENT THIS LINE FOR LOCAL DEVELOPMENT:
  // return 'ws://localhost:8080';
};