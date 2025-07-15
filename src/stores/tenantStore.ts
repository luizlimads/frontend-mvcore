import { defineStore } from 'pinia';
import { ref } from 'vue';
import { tenantService } from '@/services';
import type { Tenant } from '@/type';

export const useTenantStore = defineStore('tenant', () => {
  const tenants = ref<Tenant[]>([]);

  async function fetchAllTenants(force: boolean = false) {
    if (tenants.value.length > 0 && !force) return;
    try {
      const response = await tenantService.fetchAll();
      tenants.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar tenants:", error);
    }
  }

  function resetState() {
    tenants.value = [];
    
  }

  return { tenants, fetchAllTenants, resetState };
});