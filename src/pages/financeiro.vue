<template>
  <v-container fluid>
    <h1 class="text-h5 font-weight-bold mb-4">Dashboard</h1>

    <!-- Métricas Summary cards -->
    <v-row>
      <v-col
        v-for="card in processedSummaryCards"
        :key="card.id"
        cols="12"
        sm="6"
        md="4"
      >
        <SummaryCard v-bind="card" />
      </v-col>
    </v-row>
  <!-- Métricas Summary cards -->
    <v-row>
      <v-col cols="12" lg="8">
        <EntradasDespesasChart
          title="Balanço Financeiro Anual"
          subtitle="Fluxo de caixa"
          :series="financialSeries"
          :categories="financialCategories"
        />
      </v-col>
      
      <v-col cols="12" lg="4">
        <HierarchicalTable :raw-data="financialData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useFormatters } from '@/composables/useFormatters';
  import { apiService } from '@/services/apiService'; // Usando o serviço que criamos antes

  import SummaryCard from '@/components/SummaryCard.vue';
  import EntradasDespesasChart from '@/components/EntradasDespesasChart.vue';
  import HierarchicalTable from '@/components/HierarchicalTable.vue';

  import type {Lancamento} from '@/type'

  const { formatCurrency } = useFormatters();
  const error = ref<string | null>(null);
  const lancamentos = ref<Lancamento[]>([]);
  const lancamentosDeCredito = ref<number[]>([]);
  const lancamentosDeDebito = ref<number[]>([]);
      /**
   * Esta é a função que é disparada pelo evento do formulário.
   * Ela chama o serviço de API para fazer o POST e salvar o JWT.
   */
  const handleLancamento = async () => {
    try {
      error.value = null;
      lancamentos.value = await apiService.fetchLancamentos();

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

  const summaryCardsData = ref([
    {
      id: 1,
      title: 'Saldo',
      cardId: 'saldo-card',
      chartOptions: { ...sparklineBaseOptions, colors: ['#FFFFFF'] },
      series: [{ name: 'Saldo', data: [30, 25, 35, 30, 45, 40, 60, 55, 75, 90, 80, 100] }]
    },
    {
      id: 2,
      title: 'Entradas',
      cardId: 'entradas-card',
      chartOptions: { ...sparklineBaseOptions, colors: ['#00B0FF'] },
      series: [{ name: 'Entradas', data: lancamentosDeCredito }]
    },
    {
      id: 3,
      title: 'Despesas',
      cardId: 'despesas-card',
      secondaryText: '79 23%',
      chartOptions: { ...sparklineBaseOptions, colors: ['#F06292'] },
      series: [{ name: 'Despesas', data: lancamentosDeDebito }]
    }
  ]);

  const processedSummaryCards = computed(() => {
    return summaryCardsData.value.map(card => {
      const sumOfSeries = card.series[0].data.reduce((total, currentValue) => total + currentValue, 0);
      return {
        ...card,
        value: formatCurrency(sumOfSeries)
      };
    });
  });

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
    "2024-01-01T00:00:00.000Z", "2024-02-01T00:00:00.000Z", "2024-03-01T00:00:00.000Z",
    "2024-04-01T00:00:00.000Z", "2024-05-01T00:00:00.000Z", "2024-06-01T00:00:00.000Z",
    "2024-07-01T00:00:00.000Z", "2024-08-01T00:00:00.000Z", "2024-09-01T00:00:00.000Z",
    "2024-10-01T00:00:00.000Z", "2024-11-01T00:00:00.000Z", "2024-12-01T00:00:00.000Z"
  ]);

    
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
</script>

<style scoped>

.v-card {
  color: black;
  background-color: white
}

</style>
