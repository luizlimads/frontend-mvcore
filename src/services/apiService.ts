// Importamos o nosso cliente Axios configurado
import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse, AuthResponse, Item, Lancamento, Erp, Tenant, User } from '@/type';


export const apiService = {
  async post(endPoint: string,data: object): Promise<void> {
    const response = await apiClient.post<AuthResponse>(endPoint, data);
    console.log(response)
  },  

  async fetchProdutos(): Promise<Item[]> {
    try {
      // Agora usamos apiClient. A autenticação é adicionada automaticamente!
      const response = await apiClient.get<Item[]>(ENDPOINTS.GET_PRODUTOS);
      return response.data;
    } catch (error: any) {
      // O interceptor já trata o erro 401. Aqui podemos tratar outros erros.
      console.error('Erro ao buscar itens:', error.response?.data?.message || error.message);
      throw new Error('Não foi possível carregar os dados.');
    }
  },

  async fetchLancamentos(): Promise<Lancamento[]> {
    try {
      const response = await apiClient.get<Lancamento[]>(ENDPOINTS.GET_LANCAMENTOS);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar itens:', error.response?.data?.message || error.message);
      throw new Error('Não foi possível carregar os dados.');
    }
  }
};