// Simple and explicit API URL detection
export const getAPIUrlSimple = () => {
  // In Docker/production, check if we're running on the production domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    console.log('Full location:', window.location.href);
    console.log('Hostname detected:', hostname);
    console.log('Protocol:', protocol);
    
    // Explicitly check for production domain
    if (hostname === 'syncsketch.praverbajaj.tech') {
      console.log('Production domain detected - using production API');
      return 'https://api.syncsketch.praverbajaj.tech';
    }
    
    // Check for any non-localhost domain (in case of IP access)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.startsWith('192.168.')) {
      console.log('Non-localhost domain detected - using production API');
      return 'https://api.syncsketch.praverbajaj.tech';
    }
    
    // For localhost or local IPs
    console.log('Development/localhost detected - using localhost API');
    return 'http://localhost:3009';
  }
  
  // Server-side fallback - this shouldn't be used for API calls
  return 'http://localhost:3009';
};