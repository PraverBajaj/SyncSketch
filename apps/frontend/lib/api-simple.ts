// API URL configuration
// 🔧 CHANGE THIS FOR LOCAL DEVELOPMENT:
// For local development, change the return value below to: 'http://localhost:3009'
// For production, keep it as: 'https://api.syncsketch.praverbajaj.tech'

export const getAPIUrlSimple = () => {
  console.log("getAPIUrlSimple called"); // Debug log
  
  // FORCING PRODUCTION URL - should never use localhost
  const url = 'https://api.syncsketch.praverbajaj.tech';
  console.log("Returning API URL:", url); // Debug log
  return url;
  
  // 🔧 UNCOMMENT THIS LINE FOR LOCAL DEVELOPMENT:
  // return 'http://localhost:3009';
};