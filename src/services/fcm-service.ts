import { apiClient } from './api-client';
import {
  RegisterFCMTokenRequest,
  RegisterFCMTokenResponse,
  DeleteFCMTokenRequest,
  DeleteFCMTokenResponse,
} from '@/types/api';

export const fcmService = {
  async registerToken(data: RegisterFCMTokenRequest): Promise<RegisterFCMTokenResponse> {
    console.log('📤 FCM Token Backend\'e gönderiliyor:', JSON.stringify(data, null, 2));
    const response = await apiClient.post<RegisterFCMTokenResponse>('/fcm/register', data);
    console.log('✅ FCM Token kayıt response:', JSON.stringify(response, null, 2));
    return response;
  },

  async deleteToken(data: DeleteFCMTokenRequest): Promise<DeleteFCMTokenResponse> {
    console.log('🗑️ FCM Token backend\'den siliniyor:', JSON.stringify(data, null, 2));
    const response = await apiClient.delete<DeleteFCMTokenResponse>('/fcm/token', { data });
    console.log('✅ FCM Token silme response:', JSON.stringify(response, null, 2));
    return response;
  },
};
