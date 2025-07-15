
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { ENDPOINTS } from '../constants/endpoints';
import { accessService as accessService } from '@/services/accessService';
import router from '@/router';

const apiClient = axios.create();

const publicRoutes = [
  ENDPOINTS.LOGIN,
];

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const isPublicRoute = publicRoutes.includes(config.url || '');
    if (isPublicRoute) {
      return config;
    }

    const access = accessService.getAccess();    
    if (access) {
      config.headers.Authorization = `JWT ${access}`;
      return config;
    }

    router.push('/');
    return Promise.reject(new Error("Token de acesso não encontrado."));
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      accessService.removeAccess();
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default apiClient;