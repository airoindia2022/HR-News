import axios from 'axios';

const LOCAL_URL = 'http://localhost:5005';
const LIVE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
  ? 'https://hindustanradiance.co.in/backend' 
  : (typeof window !== 'undefined' ? window.location.origin + '/backend' : 'https://hindustanradiance.co.in/backend');

// Helper to determine which URL to use
export const getBaseUrl = async () => {
  // If we are on the live site, always use the live backend
  if (window.location.hostname !== 'localhost') {
    return LIVE_URL;
  }

  // If on localhost, try to reach the local backend
  try {
    const response = await fetch(`${LOCAL_URL}/api/news`, { method: 'HEAD', mode: 'no-cors' });
    return LOCAL_URL;
  } catch (e) {
    // Local backend not reachable, fallback to live
    console.log("Local backend not reachable, switching to live backend...");
    return LIVE_URL;
  }
};

// Create axios instance with dynamic base URL
const api = axios.create();

// Add an interceptor to set the base URL dynamically before each request
api.interceptors.request.use(async (config) => {
  const baseUrl = await getBaseUrl();
  config.baseURL = baseUrl;
  return config;
});

export default api;
