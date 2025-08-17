export const WEB_URL = process.env.NODE_ENV === 'production' 
  ? "https://api.syncsketch.praverbajaj.tech" 
  : "http://localhost:3009"
export const WS_URL = process.env.NODE_ENV === 'production' 
  ? "wss://ws.syncsketch.praverbajaj.tech" 
  : "ws://localhost:8080";