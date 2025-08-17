// Simple and explicit API URL detection
export const getAPIUrlSimple = () => {
  // Force production URL when on production domain
  if (typeof window !== 'undefined' && window.location.hostname === 'syncsketch.praverbajaj.tech') {
    return 'https://api.syncsketch.praverbajaj.tech';
  }
  
  // Default to localhost for development
  return 'http://localhost:3009';
};