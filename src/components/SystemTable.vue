<template>
    <BaseCard title="Sistemas integrados">
      <v-data-table
        :headers="cabecalhos"
        :items="dados"
        :loading="carregando"
        loading-text="Carregando dados..."
        no-data-text="Nenhum dado para exibir"
        class="bg-secondary ma-2"
      >
      </v-data-table>
    </BaseCard>
</template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useErpStore } from '@/stores';
  import dayjs from 'dayjs'

  const erpDataStore = useErpStore();
  const { erps } = storeToRefs(erpDataStore);

  const carregando = computed(() => erps.value.length === 0);
  const dados = computed(() => {
    return erps.value.map(erp => {
      return {
        nome: erp.nome,
        data_criacao: erp.data_criacao ? formatDate(erp.data_criacao) : null
      };
    });
  });

  const cabecalhos = ref([
    { title: 'Nome', key: 'nome', align: 'start' },
    { title: 'Data da integração', key: 'data_criacao', align: 'start'}
  ] as const );
  
  function formatDate(dateStr: string): string {
    return dayjs(dateStr).format('DD-MM-YYYY HH:mm')
  }

  onMounted(() => {
  });
</script>
