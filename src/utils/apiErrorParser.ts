import { API_ERROR_MAP, DEFAULT_ERROR_MESSAGE } from '@/constants/errorMessages';

/**
 * Analisa um objeto de erro da API (Axios) e retorna a primeira mensagem de erro amigável que encontrar.
 * @param error O objeto de erro capturado no bloco catch.
 * @returns Uma string com a mensagem de erro formatada.
 */
export function parseApiError(error: any): string {

    if (error.response && error.response.status === 400 && error.response.data) {
        const errorData = error.response.data;
        for (const key in errorData) {
            const backendMessage = errorData[key]?.[0];
            if (backendMessage) {
                const friendlyMessage = API_ERROR_MAP[backendMessage];
                if (friendlyMessage) {
                    return friendlyMessage;
                }
        return backendMessage;
      }
    }
  }
  
  return DEFAULT_ERROR_MESSAGE;
}