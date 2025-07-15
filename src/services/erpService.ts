import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse, Erp } from '@/type';

export const erpService = {
  async fetchAll(): Promise<ApiResponse<Erp[]>> {
    const response = await apiClient.get<Erp[]>(ENDPOINTS.GET_ERPS);
    return { data: response.data, status: response.status };
  },

};