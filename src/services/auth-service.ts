import { apiClient } from './api-client';
import { LoginRequest, LoginResponse, LogoutRequest, LogoutResponse } from '@/types/api';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/resource/login', credentials);
  },

  async logout(data?: LogoutRequest): Promise<LogoutResponse> {
    return apiClient.post<LogoutResponse>('/auth/logout', data || {});
  },
};

