const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const ENDPOINTS = {
  // Adicionamos um endpoint para autenticação
  LOGIN: `${API_BASE_URL}/auth/jwt/create/`,

  // O endpoint para buscar os dados protegidos
  GET_PRODUTOS: `${API_BASE_URL}/v1/produto/`,

  GET_LANCAMENTOS: `${API_BASE_URL}/v1/financeiro/lancamento/`,

  GET_ERPS: `${API_BASE_URL}/v1/tenant/sistema-integrado/`,

  GET_TENANTS: `${API_BASE_URL}/v1/tenant/`,
  CREATE_TENANT: `${API_BASE_URL}/v1/tenant/`,
  UPDATE_TENANT: `${API_BASE_URL}/v1/tenant/`,
  DELETE_TENANT: `${API_BASE_URL}/v1/tenant/`,

  GET_USER_ME: `${API_BASE_URL}/auth/users/me/`,
  GET_USER: `${API_BASE_URL}/v1/usuario/`,
  CREATE_USER: `${API_BASE_URL}/v1/usuario/`,
  UPDATE_USER: `${API_BASE_URL}/v1/usuario/`,
  UPDATE_PASSWORD: `${API_BASE_URL}/auth/users/set_password/`,
  DELETE_USER: `${API_BASE_URL}/v1/usuario/`,

};