<template>
  <v-container fluid >
    <v-row align-center>
      <!-- <v-col cols="12" md="2" class="d-flex align-center">
        <v-card class="pa-6 w-100" elevation="0" color="secondary">
          <v-select
            :items="[
              'Jan/25',
              'Fev/25',
              'Mar/25',
              'Abr/25',
              'Mai/25',
              'Jun/25',
              'Jul/25',
              'Ago/25',
              'Set/25',
              'Out/25',
              'Nov/25',
              'Dez/25',
            ]"
            density="compact"
            label="Mês"
            variant="outlined"
            hide-details
          />
        </v-card>
      </v-col> -->

      <v-col cols="15" md="3">
        <GaugeCard title="Margem bruta" :value="10" />
      </v-col>

      <v-col cols="15" md="3">
        <GaugeCard title="Margem de contriuição" :value="50" />
      </v-col>

      <v-col cols="15" md="3">
        <GaugeCard title="Ebitda" :value="100" />
      </v-col>

      <v-col cols="15" md="3">
        <GaugeCard title="Lucro líquido" :value="120" />
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="6">
        <BaseCard>
          <apexchart
            type="line"
            height="250"
            :options="{
              ...comparativoMargemOptions,
              title: {
                ...comparativoMargemOptions.title,
                text: 'Margem bruta - série temporal',
              },
            }"
            :series="margemBruta"
          />
        </BaseCard>
      </v-col>
      <v-col cols="6">
        <BaseCard>
          <apexchart
            type="line"
            height="250"
            :options="{
              ...comparativoMargemOptions,
              title: {
                ...comparativoMargemOptions.title,
                text: 'Margem de contribuição - série temporal',
              },
            }"
            :series="margemContribuicao"
          />
        </BaseCard>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="6">
        <BaseCard>
          <apexchart
            type="line"
            height="250"
            :options="{
              ...comparativoMargemOptions,
              title: {
                ...comparativoMargemOptions.title,
                text: 'Ebitda - série temporal',
              },
            }"
            :series="ebitda"
          />
        </BaseCard>
      </v-col>
      <v-col cols="6">
        <BaseCard>
          <apexchart
            type="line"
            height="250"
            :options="{
              ...comparativoMargemOptions,
              title: {
                ...comparativoMargemOptions.title,
                text: 'Lucro líquido - série temporal',
              },
            }"
            :series="lucroLiquido"
          />
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useTheme } from "vuetify";
import { useFormatters } from "@/composables/useFormatters";
import BaseCard from "@/components/default/BaseCard.vue";

const { formatCurrency, formatPercent } = useFormatters();
const theme = useTheme();

import GaugeCard from "@/components/dashboard/GaugeCard.vue";

const baseChartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: "Roboto, sans-serif",
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  grid: {
    borderColor: "rgba(var(--v-border-color), var(--v-border-opacity))",
    strokeDashArray: 3,
  },
  legend: {
    labels: { colors: "primary" },
  },
  tooltip: {
    theme: theme.current.value.dark ? "dark" : "light",
  },
}));

const margemBruta = ref([
  { name: '2023', data: [4250.11, 4310.55, 4280.91, 4380.12, 4450.67, 4410.23, 4510.87, 4460.45, 4400.99, 4480.15, 4550.78, 4600.33] },
  { name: '2024', data: [4610.11, 4680.55, 4640.91, 4720.12, 4780.67, 4830.23, 4890.87, 4950.45, 4880.99, 4840.15, 4920.78, 4980.33] },
  { name: '2025', data: [4910.11, 4950.55, 4980.91, 4995.12, 4950.67, 4980.23, 4990.87, 5000.00, 4960.99, 4980.15, 4995.78, 5000.00] }
]);
const margemContribuicao = ref([
  { name: '2023', data: [3120.45, 3150.88, 3100.23, 3180.92, 3250.11, 3230.76, 3280.43, 3250.99, 3200.65, 3270.81, 3310.43, 3360.12] },
  { name: '2024', data: [3380.45, 3410.88, 3490.23, 3450.92, 3390.11, 3520.76, 3550.43, 3590.99, 3560.65, 3520.81, 3580.43, 3620.12] },
  { name: '2025', data: [3600.45, 3630.88, 3650.23, 3680.92, 3660.11, 3700.76, 3730.43, 3780.99, 3750.65, 3800.81, 3830.43, 3880.12] }
]);
const ebitda = ref([
  { name: '2023', data: [1500.87, 1520.43, 1550.91, 1600.23, 1680.75, 1750.11, 1710.54, 1680.21, 1700.83, 1690.54, 1720.91, 1750.32] },
  { name: '2024', data: [1700.87, 1750.43, 1780.91, 1830.23, 1820.75, 1900.11, 1930.54, 1880.21, 1780.83, 1790.54, 1900.91, 1980.32] },
  { name: '2025', data: [1980.87, 2000.43, 2050.91, 2100.23, 2150.75, 2250.11, 2300.54, 2350.21, 2320.83, 2400.54, 2450.91, 2520.32] }
]);
const lucroLiquido = ref([
  { name: '2023', data: [950.12, 980.34, 1020.56, 1000.78, 1050.91, 1110.23, 1150.45, 1120.67, 1080.89, 1100.11, 1050.33, 1080.55] },
  { name: '2024', data: [1100.12, 1120.34, 1150.56, 1130.78, 1180.91, 1220.23, 1250.45, 1290.67, 1260.89, 1210.11, 1120.33, 1050.55] },
  { name: '2025', data: [1050.12, 1080.34, 1120.56, 1150.78, 1190.91, 1230.23, 1280.45, 1320.67, 1290.89, 1350.11, 1400.33, 1450.55] }
]);

// 3. CONFIGURAÇÕES DO GRÁFICO (APEXCHARTS)
// ===========================================
const comparativoMargemOptions = computed(() => ({
  chart: {
    type: "line",
    toolbar: { show: true },
    zoom: { enabled: false },
    fontFamily: "Roboto, sans-serif",
  },

  // Rótulos de dados desabilitados para um visual mais limpo com múltiplas linhas
  dataLabels: {
    enabled: false,
  },

  stroke: {
    curve: "straight",
    width: 3,
  },

  colors: ["#bdbdbd", "#636363", "#0052CC"],

  grid: {
    borderColor: "rgba(var(--v-border-color), var(--v-border-opacity))",
    strokeDashArray: 3,
  },

  // Eixo X agora mostra os meses do ano.
  xaxis: {
    categories: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    labels: {
      style: {
        fontSize: "12px",
        color: "primary",
      },
    },
  },

  yaxis: {
    labels: {
      style: {
        fontSize: "12px",
        color: "primary",
      },
      formatter: formatCurrency,
    },
  },

  legend: {
    labels: {
      colors: "primary",
      useSeriesColors: false,
      fontSize: "12px",
    },
  },

  tooltip: {
    theme: theme.current.value.dark ? "dark" : "light",
    y: {
      formatter: formatCurrency,
    },
  },
  title: {
    style: {
      fontSize: "15px",
      fontWeight: "medium",
      color: "primary",
    },
  },
}));
</script>
