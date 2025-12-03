export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
  TIMEOUT: 30000,
} as const;

