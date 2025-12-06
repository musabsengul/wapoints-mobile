import { apiClient } from './api-client';
import { Appointment, AppointmentListParams } from '@/types/api';

export const appointmentService = {
  async getMyAppointments(params?: AppointmentListParams): Promise<Appointment[]> {
    const queryParams = new URLSearchParams();

    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.location_id) queryParams.append('location_id', params.location_id);
    if (params?.service_id) queryParams.append('service_id', params.service_id);
    if (params?.customer_id) queryParams.append('customer_id', params.customer_id);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const url = `/appointments/my${queryString ? `?${queryString}` : ''}`;

    return apiClient.get<Appointment[]>(url);
  },

  async getAppointment(id: string): Promise<Appointment> {
    return apiClient.get<Appointment>(`/appointments/${id}`);
  },

  async createAppointment(data: {
    customer_name: string;
    service_id: string;
    start_at: string;
    end_at: string;
  }): Promise<Appointment> {
    return apiClient.post<Appointment>('/appointments', data);
  },

  async confirmAppointment(id: string): Promise<Appointment> {
    return apiClient.put(`/appointments/${id}/confirm`);
  },

  async cancelAppointment(id: string): Promise<void> {
    return apiClient.put(`/appointments/${id}/cancel`);
  },

  async rejectAppointment(id: string): Promise<void> {
    return apiClient.put(`/appointments/${id}/reject`);
  },
};

