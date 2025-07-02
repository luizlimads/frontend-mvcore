const ACCESS_KEY = 'authToken';

export const accessService = {
  /**
   * Salva o token de autenticação no localStorage.
   * @param access O token JWT a ser salvo.
   */
  saveAccess(access: string): void {
    localStorage.setItem(ACCESS_KEY, access);
  },

  /**
   * Recupera o token de autenticação do localStorage.
   * @returns O token salvo ou null se não existir.
   */
  getAccess(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  },

  /**
   * Remove o token de autenticação do localStorage (para logout).
   */
  removeAccess(): void {
    localStorage.removeItem(ACCESS_KEY);
  },
};