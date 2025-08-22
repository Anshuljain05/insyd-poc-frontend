// Production configuration - ensures correct API URLs are used
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api-production-3aea.up.railway.app',
  wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'wss://api-production-3aea.up.railway.app',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

// Ensure we use production URLs when deployed
if (typeof window !== 'undefined' && !config.isDevelopment) {
  if (config.apiUrl.includes('localhost')) {
    config.apiUrl = 'https://api-production-3aea.up.railway.app';
  }
  if (config.wsUrl.includes('localhost')) {
    config.wsUrl = 'wss://api-production-3aea.up.railway.app';
  }
}
