import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse, Lancamento } from '@/type';

export const financeiroService = {
  async fetchAll(data_lancamento_inicio:string, data_lancamento_fim: string): Promise<ApiResponse<Lancamento[]>> {
    const response = await apiClient.get<Lancamento[]>(`${ENDPOINTS.GET_LANCAMENTOS}?data_lancamento_inicio=${data_lancamento_inicio}&data_lancamento_fim=${data_lancamento_fim}`);
    return { data: response.data, status: response.status };
  },

};
