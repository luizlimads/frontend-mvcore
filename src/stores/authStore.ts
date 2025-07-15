import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import { authService } from '@/services';

import { useUserStore, useTenantStore, useErpStore } from '@/stores';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  async function logout() {

    const userStore = useUserStore();
    const tenantStore = useTenantStore();
    const erpStore = useErpStore();

    userStore.resetState();
    tenantStore.resetState();
    erpStore.resetState();

    await router.replace('/');
  }


  return { logout };
});