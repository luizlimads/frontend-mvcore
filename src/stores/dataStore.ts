import { defineStore } from 'pinia';
import { apiService } from '@/services/apiService';
import type {  Erps, Tenants } from '@/type';
import { ref } from 'vue';

export const useDataStore = defineStore('data', () => {

    const erps = ref<Erps[]>([]);
    const tenants = ref<Tenants[]>([]);
    const hasFetched = ref(false); 

    async function fetchData() {
        if (hasFetched.value) return;

        try {
            const [erpsData, tenantsData] = await Promise.all([
            (await apiService.fetchErps()).data,
            (await apiService.fetchTenants()).data
            ]);
      
        erps.value = erpsData;
        tenants.value = tenantsData;
        hasFetched.value = true;
    } catch (error) {
        console.error("Erro na store do Pinia:", error);
        throw error;
    }
  }
    return { erps, tenants, hasFetched, fetchData };
});