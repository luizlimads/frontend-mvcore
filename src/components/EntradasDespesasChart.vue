<template>
  <v-card class="pa-2" elevation="2" rounded="lg">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>
      <apexchart
        type="area"
        height="350"
        :options="computedChartOptions"
        :series="series"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useFormatters } from '@/composables/useFormatters';

const { formatCurrency } = useFormatters();

// --- DEFINIÇÃO DAS PROPS ---
// O componente agora declara as propriedades que espera receber do pai.

// Interface para tipar uma única série de dados
interface SeriesItem {
  name: string;
  data: number[];
}

// Interface para todas as props do componente
interface Props {
  series: SeriesItem[];
  categories: string[];
  title?: string; // Prop opcional para o título
  subtitle?: string; // Prop opcional para o subtítulo
}

// Usamos `withDefaults` para definir valores padrão para as props opcionais
const props = withDefaults(defineProps<Props>(), {
  title: 'Entradas e Despesas',
  subtitle: 'Análise dos últimos 12 meses',
});

// --- OPÇÕES DO GRÁFICO ---
// As opções de ESTILO do gráfico permanecem aqui, pois fazem parte da sua apresentação.
// No entanto, as opções que dependem de DADOS (como as categorias do eixo X)
// agora serão mescladas usando uma propriedade computada.

const baseChartOptions = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: { show: false },
  },
  colors: ['#00E396', '#FF4560'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0.2,
      stops: [0, 90, 100],
    },
  },
  yaxis: {
    labels: {
      formatter: formatCurrency,
    },
  },
  
  // ✅ 4. ADAPTAÇÃO DO TOOLTIP
  // Fazemos o mesmo para o tooltip, garantindo consistência.
  tooltip: {
    x: { format: 'dd MMM yyyy' },
    y: {
      formatter: formatCurrency,
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
};

const computedChartOptions = computed(() => ({
  ...baseChartOptions,
  xaxis: {
    type: 'datetime',
    categories: props.categories, // Usa as categorias recebidas via prop
    labels: {
      format: 'MMM yy',
    },
  },
}));

</script>

<style scoped>
.v-card-title {
  font-weight: 500;
}
</style>