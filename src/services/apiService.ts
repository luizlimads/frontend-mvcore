// Importamos o nosso cliente Axios configurado
import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/api/endpoints';
import { accessService } from './accessService';
import type { ApiResponse, AuthResponse, Item, Lancamento, Erps, Tenants } from '@/type';


export const apiService = {
  /**
   * Autentica o usuário e salva o access.
   * @param credentials As credenciais do usuário (email, senha).
   */
  async login(credentials: object): Promise<void> {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.LOGIN, credentials);
    const { access, refresh } = response.data;
    if (access) {
      accessService.saveAccess(access);
    }
  },
  /**
   * Faz o logout do usuário.
  */
 logout(): void {
   accessService.removeAccess();
  },
  /**
   * Faz um post (requisição autenticada).
  */
  async post(endPoint: string,data: object): Promise<void> {
    const response = await apiClient.post<AuthResponse>(endPoint, data);
    console.log(response)
  },  
  /**
   * Busca os itens da API (requisição autenticada).
  */
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
  /**
   * Busca os itens da API (requisição autenticada).
  */
  async fetchLancamentos(): Promise<Lancamento[]> {
    try {
      // Agora usamos apiClient. A autenticação é adicionada automaticamente!
      const response = await apiClient.get<Lancamento[]>(ENDPOINTS.GET_LANCAMENTOS);
      return response.data;
    } catch (error: any) {
      // O interceptor já trata o erro 401. Aqui podemos tratar outros erros.
      console.error('Erro ao buscar itens:', error.response?.data?.message || error.message);
      throw new Error('Não foi possível carregar os dados.');
    }
  },
  async fetchErps(): Promise<ApiResponse<Erps[]>> {
    try {
      const response = await apiClient.get<Erps[]>(ENDPOINTS.GET_ERPS);
      return {
        data: response.data,
        status: response.status
      };
    } catch (error: any) {
      // O interceptor já trata o erro 401. Aqui podemos tratar outros erros.
      console.error('Erro ao buscar itens:', error.response?.data?.message || error.message);
      throw new Error('Não foi possível carregar os dados.');
    }
  },
  async fetchTenants(): Promise<ApiResponse<Tenants[]>> {
    try {
      // Agora usamos apiClient. A autenticação é adicionada automaticamente!
      const response = await apiClient.get<Tenants[]>(ENDPOINTS.GET_TENANTS);
      return {
        data: response.data,
        status: response.status
      };
    } catch (error: any) {
      // O interceptor já trata o erro 401. Aqui podemos tratar outros erros.
      console.error('Erro ao buscar itens:', error.response?.data?.message || error.message);
      throw new Error('Não foi possível carregar os dados.');
    }
  },
  async createTenant(data: object): Promise<ApiResponse<Tenants>> {
    try {
      const response = await apiClient.post<Tenants>(ENDPOINTS.CREATE_TENANT, data);
      return {
        data: response.data,
        status: response.status
      };
    } catch (error: any) {
      console.error('Erro ao buscar itens:', error.response?.data?.message || error.message);
      throw new Error('Não foi possível carregar os dados.');
    }
  },
};