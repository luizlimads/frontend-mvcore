<template>
  <BaseCard
    :title="title"
    :subtitle="subtitle">
    <apexchart
      :type="type"
      height="250"
      :options="computedChartOptions"
      :series="series"
    />
  </BaseCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useFormatters } from '@/composables/useFormatters';

type ApexChartType = 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'radar' | 'polarArea';

const { formatCurrency } = useFormatters();


interface SeriesItem {
  name: string;
  data: number[];
}

interface Props {
  title?: string;
  series: SeriesItem[] | number[];
  categories?: string[];
  subtitle?: string;
  type?: ApexChartType;
  options?: object;
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  categories: () => [],
  options: () => ({}),
});

const baseChartOptions = {
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 1 },
  yaxis: {
    labels: {
      formatter: formatCurrency,
    },
  }
};

const computedChartOptions = computed(() => {
  const optionsFromProps = {
    chart: {
      type: props.type,
    },
    xaxis: {
      categories: props.categories,
    },
    tooltip: {
      y: {
        formatter: formatCurrency,
      }
    },
    title: {
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
    }
  };
  return {
    ...baseChartOptions,
    ...optionsFromProps,
    ...props.options,
    chart: {
      ...baseChartOptions.chart,
      ...optionsFromProps.chart,
      ...(props.options as any)?.chart,
    },
    xaxis: {
      ...optionsFromProps.xaxis,
      ...(props.options as any)?.xaxis,
    },
    title: {
      ...optionsFromProps.title,
      ...(props.options as any)?.title,
    },
  };
})

</script>