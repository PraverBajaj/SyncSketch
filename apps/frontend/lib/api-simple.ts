// API URL configuration
// 🔧 CHANGE THIS FOR LOCAL DEVELOPMENT:
// For local development, change the return value below to: 'http://localhost:3009'
// For production, keep it as: 'https://api.syncsketch.praverbajaj.tech'

export const getAPIUrlSimple = () => {
  // Always use production API (works for both local and production)
  return 'https://api.syncsketch.praverbajaj.tech';
  
  // 🔧 UNCOMMENT THIS LINE FOR LOCAL DEVELOPMENT:
  // return 'http://localhost:3009';
};