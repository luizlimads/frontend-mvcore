
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { accessService as accessService } from '@/services/accessService';

// Cria a instância do Axios
const apiClient = axios.create();

// 1. Interceptor de Requisição (Request Interceptor)
// Este interceptor é executado ANTES de cada requisição ser enviada.
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Pega o access do nosso serviço de access
    const access = accessService.getAccess();

    // Se o access existir, adiciona ao cabeçalho de autorização
    if (access) {
      config.headers.Authorization = `JWT ${access}`;
    }

    return config; // Retorna a configuração modificada para a requisição continuar
  },
  (error) => {
    // Se ocorrer um erro na configuração da requisição
    return Promise.reject(error);
  }
);

// 2. Interceptor de Resposta (Response Interceptor)
// Este interceptor é executado DEPOIS que uma resposta da API é recebida.
apiClient.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida (status 2xx), apenas a retorna.
    return response;
  },
  (error) => {
    // Se a API retornar um erro
    if (error.response && error.response.status === 401) {
      // Erro 401 significa "Não Autorizado" (access inválido ou expirado)
      accessService.removeAccess(); // Remove o access inválido
      // Redireciona o usuário para a página de login
      // Evita o loop de redirecionamento se já estiver na página de login
      if (window.location.pathname !== '/login') {
         window.location.href = '/login';
      }
    }
    // Rejeita a promessa para que o bloco .catch() no componente possa tratar outros erros.
    return Promise.reject(error);
  }
);

export default apiClient;