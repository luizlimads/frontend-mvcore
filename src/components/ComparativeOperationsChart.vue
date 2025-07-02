<template>
    <v-card class="pa-2" elevation="2" rounded="lg">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <apexchart
          type="bar"
          height="440"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-card-text>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  import { useFormatters } from '@/composables/useFormatters'; // Nosso formatador centralizado
  
  // --- PROPS ---
  interface SeriesData {
    name: string;
    data: number[];
  }
  interface Props {
    series: SeriesData[];
    categories: string[]; // Suas "descrições de contas"
    title?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: 'Comparativo de Períodos',
  });
  
  const { formatCurrency } = useFormatters();
  
  // --- OPÇÕES DO GRÁFICO (ADAPTADAS PARA SEUS DADOS) ---
  const chartOptions = computed(() => ({
    chart: {
      type: 'bar',
      height: 440,
      stacked: true, // Do exemplo
    },
    colors: ['#33b2df', '#90a4ae'], // Cores para Período 1 e Período 2
    plotOptions: {
      bar: {
        horizontal: true, // Do exemplo
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false, // Do exemplo
    },
    stroke: {
      width: 1,
      colors: ["#fff"] // Do exemplo
    },
    grid: {
      xaxis: {
        lines: {
          show: false // Do exemplo
        }
      }
    },
    yaxis: {
      title: { text: undefined }, // Não precisamos de título no eixo das categorias
    },
    xaxis: {
      categories: props.categories, // ✅ Usa as suas descrições de contas
      labels: {
        show:false,
      }
    },
    tooltip: {
      shared: false,
      y: {
        // ✅ Usa nosso formatador centralizado com valor absoluto
        formatter: (val: number) => formatCurrency(Math.abs(val)),
      }
    },
    legend: {
      show: false
    }
  }));
  </script>