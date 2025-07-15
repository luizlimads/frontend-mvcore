import { defineStore } from 'pinia';
import { ref } from 'vue';
import { erpService } from '@/services';
import type { Erp } from '@/type';

export const useErpStore = defineStore('erp', () => {
  const erps = ref<Erp[]>([]);

  async function fetchAllErps(force: boolean = false) {
    if (erps.value.length > 0 && !force) return;
    try {
      const response = await erpService.fetchAll();
      erps.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar erps:", error);
    }
  }

  function resetState() {
    erps.value = [];
  }
  
  return { erps, fetchAllErps, resetState };
});