import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse, SetPassword, User } from '@/type';

export const userService = {
  async fetchAll(): Promise<ApiResponse<User[]>> {
    const response = await apiClient.get<User[]>(ENDPOINTS.GET_USER);
    return { data: response.data, status: response.status };
  },

  async fetch(id: string | undefined): Promise<ApiResponse<User>> {
    if (!id) throw new Error("ID do usuário é necessário.");
    const response = await apiClient.get<User>(`${ENDPOINTS.GET_USER}${id}/`);
    return { data: response.data, status: response.status };
  },

  async create(data: object): Promise<ApiResponse<User>> {
    const response = await apiClient.post<User>(ENDPOINTS.CREATE_USER, data);
    return { data: response.data, status: response.status };
  },

  async update(id: string | null | undefined, data: object): Promise<ApiResponse<User>> {
    if (!id) throw new Error("ID do usuário é necessário.");
    const response = await apiClient.patch<User>(`${ENDPOINTS.UPDATE_USER}${id}/`, data);
    return { data: response.data, status: response.status };
  },

  async updateStatus(id: string, status: boolean): Promise<ApiResponse<User>> {
    if (!id) throw new Error("ID do usuário é necessário.");
    const data = { "is_active":status }
    const response = await apiClient.patch<User>(`${ENDPOINTS.UPDATE_USER}${id}/`, data);
    return { data: response.data, status: response.status };
  },

  async updatePassword(data: SetPassword): Promise<ApiResponse<void>> {
    if (!data.current_password || !data.new_password || !data.re_new_password) throw new Error("Todos os campos devem ser preenchidos.");
    const response = await apiClient.post<void>(ENDPOINTS.UPDATE_PASSWORD, data);
    return { data: response.data, status: response.status };
  },

  async delete(id: string | undefined): Promise<ApiResponse<void>> {
    if (!id) throw new Error("ID do usuário é necessário para exclusão.");
    const response = await apiClient.delete<void>(`${ENDPOINTS.UPDATE_USER}${id}/`);
    return { data: response.data, status: response.status };
  },

  async fetchMe(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<User>(ENDPOINTS.GET_USER_ME);
    return { data: response.data, status: response.status };
  },

};