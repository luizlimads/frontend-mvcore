<template>
    <v-card class="pa-2 h-100" elevation="2" rounded="lg">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <apexchart
          type="donut"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-card-text>
    </v-card>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  import { useFormatters } from '@/composables/useFormatters';
  
  // --- DEFINIÇÃO DAS PROPS ---
  interface Props {
    series: number[];
    labels: string[];
    title?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    title: 'Gráfico de Composição',
  });
  
  const { formatCurrency } = useFormatters();
  
  interface DataLabelsFormatterOptions {
  seriesIndex: number;
  w: {
    config: {
      labels: string[];
    };
  };
  }


  // --- OPÇÕES DO GRÁFICO (baseado no demo) ---
  const chartOptions = computed(() => ({
    chart: {
      type: 'donut',
    },
    // Os rótulos vêm das props, que serão as nossas "folhas"
    labels: props.labels,
    legend: {
      position: 'bottom'
    },
    // Opcional: formata o tooltip para mostrar valores em R$
    tooltip: {
      y: {
        formatter: formatCurrency
      }
    },
    dataLabels: {
      formatter: (val: number, opts: DataLabelsFormatterOptions) => {
        const label = opts.w.config.labels[opts.seriesIndex];
        return `${label}: ${val.toFixed(1)}%`;
    },
    },
  }));
  </script>