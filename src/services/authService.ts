
import apiClient from '@/api/apiClient';
import { ENDPOINTS } from '@/constants/endpoints';
import { accessService } from './accessService';
import type { AuthResponse } from '@/type';
import { useUserStore } from '@/stores';

export const authService = {
  async login(credentials: object): Promise<boolean> {
    try {
      const response = await apiClient.post<AuthResponse>(ENDPOINTS.LOGIN, credentials);      
      const { access, refresh } = response.data;

      if (access) accessService.saveAccess(access);
      if (refresh) accessService.saveRefresh(refresh);

      const userStore = useUserStore();
      await userStore.fetchMyUser();

      return true
    } catch (error) {
      return false;
    }
  },
  
  logout(): void {
    accessService.removeAccess();
   }
};