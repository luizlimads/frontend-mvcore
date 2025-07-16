<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="2">

        <v-card class="pa-2 mb-4 text-primary bg-secondary">
          <v-select
            class="mt-4"
            density="compact"
            label="Mês"
            variant="outlined"
            hide-details
            :items="[
              'Jan/25', 'Fev/25', 'Mar/25', 'Abr/25',
              'Mai/25', 'Jun/25', 'Jul/25', 'Ago/25',
              'Set/25', 'Out/25', 'Nov/25', 'Dez/25'
            ]"
            v-model="mesSelecionado"
          />
        </v-card>

        <v-card
          class="pa-5 pt-9 pb-9 mb-4 text-white"
          style="background: linear-gradient(90deg, #000, #0277BD );"
        >
          <div class="text-caption font-weight-medium">Saldo líquido</div>
          <div class="text-h6 font-weight-bold">R$ 3.900,00</div>
        </v-card>

        <v-card
          class="pa-5 pt-9 pb-9 mb-4 text-white"
          style="background: linear-gradient(90deg, #000, #66BB6A );"
        >
          <div class="text-caption font-weight-medium">Entradas</div>
          <div class="text-h6 font-weight-bold">R$ 12.200,00</div>
        </v-card>

        <v-card
          class="pa-5 pt-9 pb-9 mb-4 text-white"
          style="background: linear-gradient(90deg, #000, #BA68C8 );"
        >
          <div class="text-caption font-weight-medium">Saídas</div>
          <div class="text-h6 font-weight-bold">R$ 8.300,00</div>
        </v-card>
        <v-card class="pa-4 text-primary bg-secondary">
          <v-row class="text-body-2 font-weight-bold mt-2 mb-5" dense>
            <v-col class="pa-0" cols="6">Contas</v-col>
            <v-col class="pa-0 text-right" cols="6">Saldo</v-col>
          </v-row>

          <v-row class="text-caption" dense>
            <v-col class="pa-0" cols="6">Caixa:</v-col>
            <v-col class="pa-0 text-right" cols="6">R$ 2.000,00</v-col>
          </v-row>

          <v-row class="text-caption" dense>
            <v-col class="pa-0" cols="6">Bradesco:</v-col>
            <v-col class="pa-0 text-right" cols="6">R$ 1.400,00</v-col>
          </v-row>

          <v-row class="text-caption" dense>
            <v-col class="pa-0" cols="6">Itaú:</v-col>
            <v-col class="pa-0 text-right" cols="6">R$ 500,00</v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <BaseCard>
          <apexchart type="bar" height="250" :options="receitaDespesaOptions" :series="receitaDespesaSeries" />
        </BaseCard>

        <BaseCard class="mt-5">
          <apexchart
            type="bar"
            height="250"
            :options="{ ...stackedBarOptions, title: { ...stackedBarOptions.title, text: 'Receitas predominantes' } }"
            :series="stackedBarSeriesPercent"
          />
        </BaseCard>
      </v-col>

      <v-col cols="12" md="5">
        <BaseCard>
          <apexchart type="area" height="250" :options="saldoOptions" :series="saldoSeries" />
        </BaseCard>

        <BaseCard class="mt-5">
          <apexchart
            type="bar"
            height="250"
            :options="{ ...stackedBarOptions, title: { ...stackedBarOptions.title, text: 'Despesas predominantes' } }"
            :series="stackedBarSeries2Percent"
          />
        </BaseCard>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <ReceitasDespesasChart
            title="Receita operacional por grupos"
            :series="seriesReceitas"
            :categories="categoriasReceitas"
            :options="receitasOptions"
            
          />
          
          <BaseCard class="mt-5">
            <apexchart type="area" height="250" :options="fluxoOptions" :series="fluxoSeries" />          
          </BaseCard>
      </v-col>

      <v-col>
        <ReceitasDespesasChart
            title="Despesa operacional por grupos"
            :series="seriesDespesas"
            :categories="categoriasDespesas"
            :options="despesasOptions"
          />

          <BaseCard class="mt-5">
            <apexchart type="bar" height="250" :options="contasOptions" :series="contasSeries" />
          </BaseCard>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useTheme } from 'vuetify';
  
  import { useFormatters } from '@/composables/useFormatters';
  import { financeiroService } from '@/services';
  import { useAlertStore, useSnackbarStore } from '@/stores'
  import type { Lancamento } from '@/type';
  import ReceitasDespesasChart from '@/components/charts/financeiro/ReceitasDespesasChart.vue';
 
  const alertDataStore = useAlertStore()
  const snackbarDataStore = useSnackbarStore()  
  
  const { formatCurrency, formatPercent } = useFormatters();
  const error = ref<string | null>(null);
  const lancamentos = ref<Lancamento[]>([]);
  const lancamentosDeCredito = ref<number[]>([]);
  const lancamentosDeDebito = ref<number[]>([]);
  
  const alertMessage = computed(() => alertDataStore.message)
  
  if (alertMessage.value.length > 0) {
    snackbarDataStore.showSnackbar(alertMessage.value, 'warning');
    alertDataStore.clearMessage()
  }

  const handleLancamento = async () => {
    try {
      error.value = null;
      let response = await financeiroService.fetchAll('2025-02-03','2025-02-03');
      lancamentos.value = response.data;

      lancamentosDeCredito.value = lancamentos.value
      .filter(lanc => lanc.tipo === 'Crédito')
      .map(lanc => lanc.valor);

      lancamentosDeDebito.value = lancamentos.value
      .filter(lanc => lanc.tipo === 'Débito')
      .map(lanc => lanc.valor);

    } catch (e) {
      error.value = 'Falha na autenticação. Verifique suas credenciais.';
    }
  };

  onMounted(() => {
    handleLancamento();
  });

  const sparklineBaseOptions = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
      background: 'transparent',
    },
    stroke: { curve: 'smooth', width: 2.5 },
    tooltip: { enabled: false },
  };

  function onPeriodoChange(novoPeriodo: { data_inicial: string, data_final: string }) {
    console.log('Novo período recebido na página:', novoPeriodo);
  }

  const theme = useTheme();
  const summaryCardsData = ref([
    {
      id: 1,
      title: 'Saldo acumulado',
      cardId: 'saldo-card',
      chartOptions: { ...sparklineBaseOptions, colors: [theme.current.value.colors.primary] },
      series: [{ name: 'Saldo', data: [2240, 4110, 6260, 7590, 8330, 10420, 11420, 12380, 13800, 16020, 17470, 19540] }]
    },
    {
      id: 1,
      title: 'Saldo líquido',
      cardId: 'saldo-card',
      chartOptions: { ...sparklineBaseOptions, colors: [theme.current.value.colors.primary] },
      series: [{ name: 'Saldo', data: [2240, 1870, 2150, 1330, 740, 2090, 1000, 960, 1420, 2220, 1450, 2070] }]
    },
    {
      id: 2,
      title: 'Entradas',
      cardId: 'entradas-card',
      chartOptions: { ...sparklineBaseOptions, colors: [theme.current.value.colors.chart01] },
      series: [{ name: 'Entradas', data: [3420, 2810, 4960, 1550, 4120, 3190, 4760, 2680, 3530, 3870, 4460, 2670] }]
    },
    {
      id: 3,
      title: 'Saídas',
      cardId: 'despesas-card',
      secondaryText: '79 23%',
      chartOptions: { ...sparklineBaseOptions, colors: [theme.current.value.colors.chart02] },
      series: [{ name: 'Saidas', data: [1180, 940, 2810, 220, 3380, 1100, 3760, 1720, 2110, 1650, 3010, 600] }]
    }
  ]);

  // DADOS FICTICIOS SERIE TEMPORAL ANO
  const financialSeries = ref([
    {
      name: 'Receitas',
      data: [3100, 4000, 2800, 5100, 4200, 10900, 10000, 11000, 9000, 10000, 10500, 11500],
    },
    {
      name: 'Despesas',
      data: [1100, 3200, 4500, 3200, 3400, 5200, 4100, 5500, 6000, 6500, 7000, 6000],
    },
  ]);

  const financialCategories = ref([
    "2024-01-01", "2024-02-01", "2024-03-01",
    "2024-04-01", "2024-05-01", "2024-06-01",
    "2024-07-01", "2024-08-01", "2024-09-01",
    "2024-10-01", "2024-11-01", "2024-12-01"
  ]);

  const receitasEDespesasOptions = ref({
    chart: {
      type: 'area',
    },
    colors: [theme.current.value.colors.chart01,theme.current.value.colors.chart02],
    fill:{
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 90, 100]

      }
    }
  });

  // DADOS FICTICIOS DESPESA MES
const seriesReceitas = ref([
  {
    name: 'Receitas',
    data: [81000, 40000, 5300, 3450, 5800, 2800, 3100, 1500, 2200, 900]
  }
]);

const categoriasReceitas = ref([
  'Vendas Físicas', 
  'Vendas Online', 
  'Serviços', 
  'Parcerias', 
  'Campanhas',
  'Venda B2B',
  'Licenciamento',
  'Cashback',
  'Rendimentos',
  'Reembolsos'
]);

  const receitasOptions = ref({
    chart: {
      type: 'bar',
    },
    colors: [theme.current.value.colors.chart01],
    title: {
      style: {
        fontSize: '15px',
        fontWeight: 'medium',
        color: 'primary'
      }
    },
  });


  // DADOS FICTICIOS DESPESA MES
const seriesDespesas = ref([
  {
    name: 'Despesas',
    data: [36000, 29500, 12000, 3550, 5050, 3000, 2100, 1900, 2700, 800]
  }
]);

const categoriasDespesas = ref([
  'Salários', 
  'Fornecedores',
  'Aluguel', 
  'Energia', 
  'Logística',
  'Material Escritório',
  'Manutenção',
  'Internet',
  'Telefonia',
  'Tarifas Bancárias'
]);

  const despesasOptions = ref({
    chart: {
      type: 'bar',
    },
    colors: [theme.current.value.colors.chart02],
  });
  
  // DADOS FICTICIOS DESPESA DONUT
  const seriesDDespesas = computed(() => {
    return seriesDespesas.value[0]?.data || []; 
  });
  const despesasDOptions = computed(() => ({
    chart: { type: 'donut' },
    labels: categoriasReceitas.value,
    legend: { position: 'right',      floating: false  },
    tooltip: {
      y: { formatter: (value: number) => formatCurrency(value) }
    },
    dataLabels: {
      enabled: true,
      formatter: (value: number) => `${value.toFixed(1)}%`,
    },
    responsive: [{
      breakpoint: 500,
      options: {
        chart: { width: '80%' },
        legend: { position: 'bottom' }
      }
    }]
  }));
  
  // DADOS FICTICIOS RESUMO CONTAS
  
  const dadosContas = ref([
  {
    id: "a20cbc4a-9fc0-4294-8340-e62948326f84",
    descricao_conta: "Itaú - Conta Principal",
    entradas: [
      { descricao: 'Salário', valor: 7500 },
      { descricao: 'Vendas Online', valor: 2350.50 },
      { descricao: 'Rendimentos', valor: 120.75 },
      { descricao: 'Vendas Online', valor: 850.25 },
    ],
    saidas: [
      { descricao: 'Aluguel', valor: 2500 },
      { descricao: 'Supermercado', valor: 1800 },
      { descricao: 'Internet/Telefone', valor: 350 },
      { descricao: 'Transporte', valor: 450 },
      { descricao: 'Supermercado', valor: 600 },
    ]
  },
  {
    id: "f1e2d3c4-5b6a-4e8d-9f0a-1b2c3d4e5f6a",
    descricao_conta: "Nubank - Cartão de Crédito",
    entradas: [
      { descricao: 'Pagamento Fatura', valor: 4500 },
    ],
    saidas: [
      { descricao: 'Restaurantes', valor: 850 },
      { descricao: 'Assinaturas', valor: 150 },
      { descricao: 'Compras Online', valor: 2200 },
      { descricao: 'Lazer', valor: 600 },
      { descricao: 'Restaurantes', valor: 400 },
    ]
  }
]);
  
  const dadosDoResumo = ref([
  {
    "id": "9818bc34-7e74-435c-addc-f7e394a26801",
    "descricao_conta": "Bradesco - Conta Poupança",
    "total_entradas": 1500.00,
    "total_saidas": 350.00
  },
  {
    "id": "1da7b56a-4c2f-4e0d-9d2a-8c9f7b1e3a4f",
    "descricao_conta": "Santander - Conta Salário",
    "total_entradas": 8800.00,
    "total_saidas": 8750.90
  },
  {
    "id": "b8e9c2d1-5a6b-4f8c-9a0e-7d6f5c4b3a2e",
    "descricao_conta": "Banco do Brasil - Conta Empresarial",
    "total_entradas": 85300.75,
    "total_saidas": 72150.20
  },
  {
    "id": "c3d4e5f6-7a8b-4c9d-8e1f-2a3b4c5d6e7f",
    "descricao_conta": "Caixa Econômica - Poupança Fácil",
    "total_entradas": 500.00,
    "total_saidas": 50.00
  },
  {
    "id": "f1e2d3c4-5b6a-4e8d-9f0a-1b2c3d4e5f6a",
    "descricao_conta": "Nubank - Conta Digital",
    "total_entradas": 12400.30,
    "total_saidas": 11890.00
  },
  {
    "id": "a7b8c9d0-1e2f-4a5b-8c6d-7e8f9a0b1c2d",
    "descricao_conta": "Inter - Conta Digital PJ",
    "total_entradas": 45000.00,
    "total_saidas": 48500.10
  },
  {
    "id": "e3f4a5b6-c7d8-4e9f-8a0b-1c2d3e4f5a6b",
    "descricao_conta": "Sicoob - Conta Cooperado",
    "total_entradas": 9870.00,
    "total_saidas": 6500.00
  },
  {
    "id": "d9e8f7a6-b5c4-4d3e-a2b1-c0d9e8f7a6b5",
    "descricao_conta": "Bradesco - Conta de Investimentos",
    "total_entradas": 35000.00,
    "total_saidas": 15000.00
  },
  {
    "id": "c1d0e9f8-a7b6-4c5d-8e3f-2a1b0c9d8e7f",
    "descricao_conta": "Itaú - Conta Universitária",
    "total_entradas": 1200.50,
    "total_saidas": 1150.75
  }]);

  const simulatedTitle = ref('Comparativo de Variação Anual (R$)');
  const simulatedCategories = ref([
    'Vendas',
    'Recebimento Crediário',
    'Fornecedores',
    'Taxas de Meios de Pag.',
    'Despesas Financeiras',
  ]);

  const simulatedSeries = ref([
    {
      name: 'Ano Atual',
      data: [
        2093740,  // Vendas
        10885104, // Recebimento Crediário
        5621570,  // Fornecedores
        2314620,  // Taxas de Meios de Pag.
        800660,   // Despesas Financeiras
      ],
    },
    {
      name: 'Ano Anterior',
      // O TRUQUE: Estes são os valores do ano anterior, mas multiplicados por -1.
      // Isso faz com que as barras cresçam para o lado oposto no gráfico.
      data: [
        -1320629,   // Vendas
        -11401534,  // Recebimento Crediário
        -15050447,  // Fornecedores
        -22959425,  // Taxas de Meios de Pag.
        -686434,    // Despesas Financeiras
      ],
    },
  ]);

  const financialData = ref({
  "saidas": {
    "despesasFinanceiras": {
      "taxaAdm": 20.00,
      "totalDespesasFinanceiras":20
    },
    "fornecedores": 20.00,
    "outrasDespesas": 20.00,
    "totalSaidas": 60.00
  },
  "entradas": {
    "receitaVendas": {
      "vendas": 20.00,
      "recebimentoCrediario": 20.00,
      "totalReceitaVendas":40
    },
    "totalEntradas": 40.00
  }
});

const receitaDespesaOptions = {
  chart: {
    id: 'receita-despesa'
  },
  fill:{
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 90, 100]
    }
  },
  colors: [theme.current.value.colors.chart01, theme.current.value.colors.chart02],
  title: {
    text: 'Receitas x Despesas',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
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
  }
}

const mesSelecionado = ref('Jun/25');

const receitaDespesaSeries = [
  { name: 'Receita', data: [3000, 3200, 3100, 3500, 3700, 4000] },
  { name: 'Despesa', data: [2000, 2500, 2800, 3000, 3200, 3500] }
]

const saldoOptions = {
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
    text: 'Saldo Acumulado',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  colors: [theme.current.value.colors.chart01],
  fill:{
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  }
}

const saldoSeries = [{ name: 'Saldo', data: [1000, 2300, 2800, 3500, 4200, 5000] }]

const stackedBarOptions = {
  chart: { stacked: true },
  plotOptions: { bar: { horizontal: true } },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    labels: {
      formatter: formatPercent
    },
    min: 0,
    max: 1,
  },
  title: {
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: [
    theme.current.value.colors.chart01,
    theme.current.value.colors.chart02,
    theme.current.value.colors.chart03,
    theme.current.value.colors.chart04,
    theme.current.value.colors.chart05,
  ],
  fill:{
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 100]
    }
  },
  tooltip: {
    y: {
      formatter: formatPercent
    }
  },
}

const stackedBarSeries = [
  { name: 'Vendas Físicas', data: [75000, 79000, 77000, 80000, 82000, 81000] },
  { name: 'Vendas Online', data: [32000, 34000, 36000, 37000, 39000, 40000] },
  { name: 'Serviços', data: [4500, 4600, 4800, 5000, 5200, 5300] },
  { name: 'Parcerias', data: [3200, 3300, 3100, 3400, 3500, 3450] },
  { name: 'Campanhas', data: [5000, 5200, 5500, 5300, 5600, 5800] }
]

const stackedBarSeries2 = [
  { name: 'Salários', data: [35000, 35200, 35500, 35700, 35900, 36000] },
  { name: 'Fornecedores', data: [28000, 26500, 29000, 27500, 28500, 29500] },
  { name: 'Aluguel', data: [12000, 12000, 12000, 12000, 12000, 12000] },
  { name: 'Energia', data: [3500, 3600, 3400, 3300, 3700, 3550] },
  { name: 'Logística', data: [4500, 4700, 4900, 5100, 4950, 5050] }
]

const stackedBarSeriesPercent = [
  { name: 'Vendas Físicas', data: [0.6265, 0.6181, 0.6080, 0.6107, 0.6030, 0.5926] },
  { name: 'Vendas Online',  data: [0.2672, 0.2659, 0.2845, 0.2825, 0.2867, 0.2928] },
  { name: 'Serviços',       data: [0.0376, 0.0360, 0.0379, 0.0382, 0.0382, 0.0388] },
  { name: 'Parcerias',      data: [0.0267, 0.0258, 0.0245, 0.0260, 0.0257, 0.0253] },
  { name: 'Campanhas',      data: [0.0418, 0.0426, 0.0450, 0.0425, 0.0464, 0.0505] }
];

const stackedBarSeries2Percent = [
  { name: 'Salários',     data: [0.4217, 0.4293, 0.4090, 0.4271, 0.4219, 0.4132] },
  { name: 'Fornecedores', data: [0.3373, 0.3232, 0.3341, 0.3289, 0.3350, 0.3387] },
  { name: 'Aluguel',      data: [0.1446, 0.1463, 0.1382, 0.1435, 0.1410, 0.1378] },
  { name: 'Energia',      data: [0.0422, 0.0439, 0.0392, 0.0395, 0.0435, 0.0407] },
  { name: 'Logística',    data: [0.0542, 0.0573, 0.0564, 0.0610, 0.0582, 0.0580] }
];

const fluxoOptions = {
  chart: { id: 'fluxo',
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
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  },
  yaxis: {
    labels: {
      formatter: formatCurrency
    },
  },
  title: { 
    text: 'Fluxo de Caixa',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  colors: [
    theme.current.value.colors.chart01,
    theme.current.value.colors.chart02,
  ],
  fill:{
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 99, 100]
    }
  },
  tooltip: {
    y: {
      formatter: formatCurrency
    }
  }, 
  stroke: {
    curve: 'smooth', width: 1
  },  
}
const fluxoSeries = [
  { name: 'Entradas', data: [3000, 3200, 3100, 3500, 3700, 4000] },
  { name: 'Saídas', data: [2000, 2500, 2800, 3000, 3200, 3500] }
]

const contasOptions = {
  chart: { 
    id: 'contas',
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
  xaxis: { categories: ['Caixa', 'Bradesco', 'Itaú'] },
  yaxis: {
    labels: {
      formatter: formatCurrency
    },
  },
  title: {
    text: 'Comparativo por Conta Bancária',
    style: {
      fontSize: '15px',
      fontWeight: 'medium',
      color: 'primary'
    }
  },
  colors: [
    theme.current.value.colors.chart01,
    theme.current.value.colors.chart02,
  ],
  fill:{
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  tooltip: {
    y: {
      formatter: formatCurrency
    }
  },
}
const contasSeries = [
  { name: 'Receita', data: [5000, 4200, 3000] },
  { name: 'Despesa', data: [3000, 2800, 2500] }
]

</script>