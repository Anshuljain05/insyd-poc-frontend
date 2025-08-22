const isDevelopment = process.env.NODE_ENV === 'development';

export const config = {
  apiUrl: isDevelopment 
    ? 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_API_URL!,
  wsUrl: isDevelopment
    ? 'ws://localhost:3001'
    : process.env.NEXT_PUBLIC_WS_URL!,
  isDevelopment
};
