
export const getWSUrl = () => {
  // Always use production WebSocket (works for both local and production)
  return 'wss://ws.syncsketch.praverbajaj.tech';
  
  // 🔧 UNCOMMENT THIS LINE FOR LOCAL DEVELOPMENT:
  // return 'ws://localhost:8080';
};