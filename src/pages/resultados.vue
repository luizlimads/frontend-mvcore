<template>
  <v-row>
    <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="area" height="250" :options="resultadoOptions" :series="resultadoSeries" />
      </BaseCard>
    </v-col>
  
      <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="area" height="250" :options="options" :series="series" />
      </BaseCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="8">
      <BaseCard>
        <apexchart type="bar" height="250" :options="receitaMetaOptions" :series="receitaMetaSeries" />
      </BaseCard>
    </v-col>
  
      <v-col cols="12" md="4">
      <BaseCard>
        <apexchart type="bar" height="250" :options="receitaMetaAnoOptions" :series="receitaMetaAnoSeries" />
      </BaseCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="8">
      <BaseCard>
        <apexchart type="bar" height="250" :options="custoMetaOptions" :series="custoMetaSeries" />
      </BaseCard>
    </v-col>
  
    <v-col cols="12" md="4">
      <BaseCard>
        <apexchart type="bar" height="250" :options="custoMetaAnoOptions" :series="custoMetaAnoSeries" />
      </BaseCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="8">
      <BaseCard>
        <apexchart type="bar" height="250" :options="lucroBrutoOptions" :series="lucroBrutoSeries" />
      </BaseCard>
    </v-col>
  
      <v-col cols="12" md="4">
      <BaseCard>
        <apexchart type="bar" height="250" :options="lucroBrutoAnoOptions" :series="lucroBrutoAnoSeries" />
      </BaseCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="bar" height="250"
        :options="{ ...despesasMetaOptions, title: { ...despesasMetaOptions.title, text: 'Ebitda' } }"
        :series="ebitdaSeries" />
      </BaseCard>
    </v-col>
  
    <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="bar" height="250" 
        :options="{ ...despesasMetaOptions, title: { ...despesasMetaOptions.title, text: 'Margem de contribuição' } }"
        :series="contribuicaoSeries" />
      </BaseCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="bar" height="250"
        :options="{ ...despesasMetaOptions, title: { ...despesasMetaOptions.title, text: 'Despesas fixas x Projetado' } }"
        :series="despesasfixasMetaSeries" />
      </BaseCard>
    </v-col>
  
    <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="bar" height="250" 
        :options="{ ...despesasMetaOptions, title: { ...despesasMetaOptions.title, text: 'Despesas variáveis x Projetado' } }"
        :series="despesasvariaveisMetaSeries" />
      </BaseCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="bar" height="250"
        :options="{ ...emprestimosOptions, title: { ...emprestimosOptions.title, text: 'Empréstimos e Financiamentos (mensal)' } }"
        :series="emprestimosSeries" />
      </BaseCard>
    </v-col>
  
    <v-col cols="12" md="6">
      <BaseCard>
        <apexchart type="bar" height="250" 
        :options="{ ...emprestimosAnoOptions, title: { ...emprestimosAnoOptions.title, text: 'Empréstimos e Financiamentos (anual)' } }"
        :series="emprestimosAnoSeries" />
      </BaseCard>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="12">
      <DreChart></DreChart>
    </v-col>
  </v-row>


</template>

<script setup lang="ts">
import DreChart from '@/components/DreChart.vue';
import { useFormatters } from '@/composables/useFormatters';

const { formatCurrency, formatPercent } = useFormatters();

const receitaMetaSeries = [
  { name: 'Realizado', data: [3000, 3200, 3100, 3500, 3700, 4000, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [3500, 3300, 3000, 4000, 4000, 4200, 4000, 3800, 3800, 3600, 3500, 3500] }
]

const receitaMetaOptions = {  
  colors: ['#38A169', '#F7B500'],
  title: {
    text: 'Receita atual x Projetada',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const receitaMetaAnoSeries = [
  { name: 'Realizado', data: [20500] },
  { name: 'Potencial', data: [22200] }
]

const receitaMetaAnoOptions = {
  chart: {
    stacked: true, 
  },
  colors: ['#38A169', '#F7B500'],
  title: {
    text: 'Receita potencial (ano)',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['2025'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const custoMetaSeries = [
  { name: 'Realizado', data: [2000, 2200, 2100, 2500, 2700, 3000, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [2100, 2100, 2500, 2300, 2700, 3200, 3000, 3000, 2500, 2500, 2000, 2000] }
]

const custoMetaOptions = {  
  colors: ['#90A4AE', '#F7B500'],
  title: {
    text: 'Custo atual x Projetado',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const custoMetaAnoSeries = [
  { name: 'Realizado', data: [14500] },
  { name: 'Potencial', data: [15000] }
]

const custoMetaAnoOptions = {
  chart: {
    stacked: true, 
  },
  colors: ['#90A4AE', '#F7B500'],
  title: {
    text: 'Custo potencial (ano)',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['2025'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const lucroBrutoSeries = [
  { name: 'Realizado', data: [2500, 2700, 2600, 3000, 3200, 3500, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [3000, 2800, 2500, 3500, 3500, 3700, 3500, 3300, 3300, 3100, 3000, 3000] }
]

const lucroBrutoOptions = {  
  colors: ['#38A169', '#F7B500'],
  title: {
    text: 'Lucro bruto x Projetado',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const lucroBrutoAnoSeries = [
  { name: 'Realizado', data: [17500] },
  { name: 'Potencial', data: [19200] }
]

const lucroBrutoAnoOptions = {
  chart: {
    stacked: true, 
  },
  colors: ['#38A169', '#F7B500'],
  title: {
    text: 'Lucro bruto potencial (ano)',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['2025'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const despesasfixasMetaSeries = [
  { name: 'Realizado', data: [1000, 1000, 1000, 1000, 1000, 1000, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [1000, 1000, 1000, 1000, 1000, 1000, 1100, 1100, 1100, 1100, 1100, 1100] }
]

const despesasvariaveisMetaSeries = [
  { name: 'Realizado', data: [1000, 1200, 1100, 1500, 1700, 2000, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [1100, 1100, 1500, 1300, 1700, 2200, 2000, 2000, 1500, 1500, 1000, 1000] }
]

const ebitdaSeries = [
  { name: 'Realizado', data: [1000, 1200, 1100, 1500, 1700, 2000, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [1100, 1100, 1500, 1300, 1700, 2200, 2000, 2000, 1500, 1500, 1000, 1000] }
]

const contribuicaoSeries = [
  { name: 'Realizado', data: [1000, 1200, 1100, 1500, 1700, 2000, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [1100, 1100, 1500, 1300, 1700, 2200, 2000, 2000, 1500, 1500, 1000, 1000] }
]

const despesasMetaOptions = {  
  colors: ['#90A4AE', '#F7B500'],
  title: {
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const emprestimosSeries = [
  { name: 'Realizado', data: [583, 512, 599, 547, 521, 573, 0, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600] }
]

const emprestimosOptions = {  
  colors: ['#90A4AE', '#F7B500'],
  title: {
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const emprestimosAnoSeries = [
  { name: 'Realizado', data: [8500, 8100, 7800, 7500, 3335, 0, 0, 0, 0, 0] },
  { name: 'Projetado', data: [8500, 8000, 8000, 7500, 7500, 7000, 6800, 6600, 6300, 6000] }
]

const emprestimosAnoOptions = {  
  colors: ['#90A4AE', '#F7B500'],
  title: {
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  legend: {
    labels: {
      colors: 'primary',
      useSeriesColors: false,
      fontSize: '12px'
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '9px',
      colors: ['white']
    }
  },
  fill: {
    opacity: 0.8
  }
}

const resultadoSeries = [
  { name: 'Receita Líquida', data: [3000, 3200, 3100, 3500, 3700, 4000] },
  { name: 'Lucro Bruto', data: [2000, 2200, 2100, 2500, 2700, 3000] },
  { name: 'Lucro Líquido', data: [1700, 1800, 1850, 2120, 2350, 2500] },
]

const resultadoOptions = {
  chart: {
    id: 'saldo-line',
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
  stroke: {
    curve: 'smooth', width: 1
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun'],
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        color: 'primary'
      },
      formatter: formatCurrency,
    }
  },
  title: {
    text: 'Receita e lucro',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  colors: ['#64B5F6', '#1E88E5', '#0052CC'],
  fill:{
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.5,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  }
}

const series = [
  {
    name: 'Receitas',
    type: 'column',
    data: [5000, 7000, 6000, 8000, 7500, 9000]
  },
  {
    name: 'Despesas',
    type: 'column',
    data: [-3000, -4000, -3500, -5000, -4800, -6000]
  },
  {
    name: 'Resultado',
    type: 'line',
    data: [2000, 3000, 2500, 3000, 2700, 3000]
  }
]

const options = {
  chart: {
    type: 'line',
    stacked: false,
    height: 250,
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
  title: {
    text: 'Lucro / Prejuízo',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  },
  yaxis: {
    labels: {
      formatter: formatCurrency,
    }
  },
  tooltip: {
    y: {
      formatter: formatCurrency,
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#0052CC', '#90A4AE', '#38A169'],
  stroke: {
    width: [0, 0, 3]
  },
  plotOptions: {
    bar: {
      columnWidth: '40%',
    }
  },
  fill: {
    type: 'solid',
    opacity: 0.8
  }
}

</script>
