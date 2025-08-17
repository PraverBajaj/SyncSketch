// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.syncsketch.praverbajaj.tech'
  : 'http://localhost:3009';

const WS_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'wss://ws.syncsketch.praverbajaj.tech'
  : 'ws://localhost:8080';

export const API_ENDPOINTS = {
  signin: `${API_BASE_URL}/signin`,
  signup: `${API_BASE_URL}/signup`,
  auth: `${API_BASE_URL}/auth`,
  rooms: `${API_BASE_URL}/rooms`,
  // Add other endpoints as needed
};

export const WS_ENDPOINTS = {
  socket: WS_BASE_URL,
};

export { API_BASE_URL, WS_BASE_URL };