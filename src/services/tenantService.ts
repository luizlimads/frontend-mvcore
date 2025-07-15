import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse, Tenant } from '@/type';

export const tenantService = {
  async fetchAll(): Promise<ApiResponse<Tenant[]>> {
    const response = await apiClient.get<Tenant[]>(ENDPOINTS.GET_TENANTS);
    return { data: response.data, status: response.status };
  },

  async create(data: object): Promise<ApiResponse<Tenant>> {
    const response = await apiClient.post<Tenant>(ENDPOINTS.CREATE_TENANT, data);
    return { data: response.data, status: response.status };
  },

  async update(id: string|null|undefined, data: object): Promise<ApiResponse<Tenant>> {
    if (!id) throw new Error("ID do cliente é necessário.");
    const response = await apiClient.patch<Tenant>(`${ENDPOINTS.UPDATE_TENANT}${id}/`, data);
    return { data: response.data, status: response.status };
  },

  async delete(id: string | undefined): Promise<ApiResponse<void>> {
    if (!id) throw new Error("ID do cliente é necessário.");
    const response = await apiClient.delete<void>(`${ENDPOINTS.DELETE_TENANT}${id}/`);
    return { data: response.data, status: response.status };
  },
};