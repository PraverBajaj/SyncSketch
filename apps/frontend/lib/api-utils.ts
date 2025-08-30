
export const getWSUrl = () => {
  // Always use production WebSocket (works for both local and production)
  return 'https://syncsketch-ws.onrender.com';
  
  // 🔧 UNCOMMENT THIS LINE FOR LOCAL DEVELOPMENT:
  // return 'ws://localhost:8080';
};