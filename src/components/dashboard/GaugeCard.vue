<template>
  <BaseCard class="d-flex flex-column h-100">
    <!-- Título centralizado -->
    <p class="text-subtitle-2 text-primary text-center">{{ title }}</p>

    <!-- 
      Container do Gráfico:
      - flex-grow-1: Faz o container crescer para preencher o espaço vertical.
      - d-flex align-center justify-center: Centraliza o gráfico perfeitamente.
    -->
    <div class="flex-grow-1 d-flex align-center justify-center">
      <apexchart
        type="radialBar"
        height="200" 
        width="200"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    
    <!-- Subtítulo centralizado -->
    <p class="text-caption text-primary text-center mt-n4">Realizado vs Meta</p>
  </BaseCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';

// 1. DEFINIÇÃO DAS PROPRIEDADES
// ===============================
const props = defineProps<{
    title: string;
    value: number; // Ex: 110 para 110%, 85 para 85%
}>();

// 2. SETUP INICIAL
// ================
const theme = useTheme();

// 3. DADOS DO GRÁFICO
// =====================
const series = computed(() => [props.value]);

// 4. OPÇÕES DO GRÁFICO (ESTILO SEMI-CÍRCULO COM VALOR INTERNO)
// =========================================================
const chartOptions = computed(() => {
  const gaugeColor = props.value >= 100 
    ? theme.current.value.colors.success 
    : "#F7B500";

  return {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 15,
          size: '65%',
        },
        track: {
          background: "#e7e7e7",
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 0.5,
            blur: 2
          }
        },
        // Habilitando e configurando o dataLabel para mostrar o valor
        dataLabels: {
          show: true,
          name: {
            show: false, // Oculta o nome da série ("Realizado vs Meta")
          },
          value: {
            color: gaugeColor, // Cor dinâmica
            fontSize: '24px', // Tamanho da fonte do valor
            fontWeight: 'bold',
            offsetY: -10, // Ajuste para centralizar verticalmente
            formatter: (val: number) => {
              return val.toFixed(1) + '%'; // Formata o número
            }
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      colors: [gaugeColor],
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      },
    },
    stroke: {
      lineCap: 'round'
    },
  };
});
</script>
