import { apiClient } from './api-client';
import { LoginRequest, LoginResponse } from '@/types/api';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/resource/login', credentials);
  },
};

