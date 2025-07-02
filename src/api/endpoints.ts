const API_BASE_URL = "https://backend-mvcore-d3byagbfchgnf5dw.brazilsouth-01.azurewebsites.net"; // Troque pela URL real da sua API

export const ENDPOINTS = {
  // Adicionamos um endpoint para autenticação
  LOGIN: `${API_BASE_URL}/auth/jwt/create/`,

  // O endpoint para buscar os dados protegidos
  GET_PRODUTOS: `${API_BASE_URL}/v1/produto/`,
  GET_LANCAMENTOS: `${API_BASE_URL}/v1/financeiro/lancamento/`,
  GET_ERPS: `${API_BASE_URL}/v1/tenant/sistema-integrado/`,
  GET_TENANTS: `${API_BASE_URL}/v1/tenant/`,
  CREATE_TENANT: `${API_BASE_URL}/v1/tenant/`,

};