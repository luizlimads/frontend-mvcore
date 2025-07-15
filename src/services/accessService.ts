const ACCESS_KEY = 'authToken';
const REFRESH_KEY = 'refreshToken';

export const accessService = {
  saveAccess(access: string): void {
    localStorage.setItem(ACCESS_KEY, access);
  },

  saveRefresh(refresh: string): void {
    localStorage.setItem(REFRESH_KEY, refresh);
  },

  getAccess(): string | null {
    return localStorage.getItem(ACCESS_KEY);
  },

  removeAccess(): void {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

};