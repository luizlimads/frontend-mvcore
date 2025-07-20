<template>
  <v-container fluid>
    <BaseCard title="DRE - 1º Semestre 2025">
      <!-- Wrapper para permitir a rolagem horizontal -->
      <div class="table-wrapper">
        <!-- A v-table tem uma largura mínima para forçar a rolagem em telas menores -->
        <v-table class="bg-secondary" density="compact" style="min-width: 1000px;">
          <thead>
            <tr>
              <!-- Cabeçalho da primeira coluna (Contas) é fixo na rolagem -->
              <th class="text-left text-primary font-weight-bold" style="width: 35%; position: sticky; left: 0; z-index: 2; background-color: #CFD8DC;">Conta</th>
              <!-- Cabeçalhos dos meses são gerados dinamicamente -->
              <th class="text-right text-primary font-weight-bold" v-for="header in tableHeaders" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in dreData" :key="item.id">
              <!-- Linha Principal (Pai) -->
              <tr :class="{ 'font-weight-bold': item.isTotal, 'bg-blue-grey-lighten-5': item.isTotal }">
                <!-- Célula da primeira coluna (Contas) é fixa na rolagem -->
                <td style="position: sticky; left: 0; z-index: 1; background-color: #F5F5F5;" :class="{ 'bg-blue-grey-lighten-5': item.isTotal }">
                  <v-btn
                    v-if="item.children && item.children.length > 0"
                    variant="text"
                    size="x-small"
                    :icon="expanded.includes(item.id) ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                    @click="toggle(item.id)"
                    class="mr-1"
                  />
                  {{ item.item }}
                </td>
                <!-- Células de valores -->
                <td v-for="(valor, index) in item.valores" :key="index" class="text-right">
                  <span :class="valor < 0 ? 'text-error' : 'text-primary'">
                    {{ formatCurrency(valor) }}
                  </span>
                </td>
              </tr>
              <!-- Linhas Filhas (Detalhes) - Renderizadas condicionalmente -->
              <tr v-if="expanded.includes(item.id)" v-for="child in item.children" :key="child.id">
                <td class="pl-12 text-caption" style="position: sticky; left: 0; z-index: 1; background-color: #F5F5F5;">{{ child.item }}</td>
                <td v-for="(valor, index) in child.valores" :key="index" class="text-right text-caption">
                  <span :class="valor < 0 ? 'text-error' : 'text-primary'">
                    {{ formatCurrency(valor) }}
                  </span>
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </div>
    </BaseCard>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import BaseCard from '@/components/default/BaseCard.vue';
import { useFormatters } from '@/composables/useFormatters';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const { formatCurrency } = useFormatters();
const theme = useTheme();

// 1. GERAÇÃO DINÂMICA DE CABEÇALHOS E DADOS
// ==========================================

// Gera os cabeçalhos da tabela: "Total" + Jan/25 a Jun/25.
const tableHeaders = computed(() => {
  const headers = ['Total'];
  for (let i = 0; i < 6; i++) { // Loop para 6 meses
    headers.push(dayjs('2025-01-01').add(i, 'month').format('MMM/YY'));
  }
  return headers;
});

// Função para gerar 6 meses de dados aleatórios para uma conta.
const generateMonthlyValues = (base: number, variation: number, isNegative = false) => {
  const values = [];
  for (let i = 0; i < 6; i++) { // Gera 6 valores
    const randomFactor = (Math.random() - 0.5) * variation;
    const value = base + (base * 0.03 * i) + randomFactor; // Fator de crescimento mensal
    values.push(isNegative ? -Math.abs(value) : Math.abs(value));
  }
  return values;
};

// Função para somar os valores para a coluna "Total".
const sumValues = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0);

// Estrutura hierárquica do DRE com a nova ordem e valores base.
const dreStructure = [
  { id: 1, item: '(+) Receita', children: [ { id: 11, item: 'Vendas de Produtos', base: 205000, variation: 8000 }, { id: 12, item: 'Receita de Serviços', base: 30000, variation: 2000 } ] },
  { id: 2, item: '(-) Custo de Mercadoria Vendida (CMV)', children: [ { id: 21, item: 'Custo de Matéria-Prima', base: 95000, variation: 4000, isNegative: true }, { id: 22, item: 'Mão de Obra Direta', base: 35000, variation: 500, isNegative: true } ] },
  { id: 3, item: '(=) Lucro Bruto', isTotal: true },
  { id: 4, item: '(-) Despesas Variáveis', children: [ { id: 41, item: 'Comissões de Vendas', base: 23500, variation: 1000, isNegative: true }, { id: 42, item: 'Impostos sobre Vendas', base: 28000, variation: 1500, isNegative: true } ] },
  { id: 5, item: '(=) Margem de Contribuição', isTotal: true },
  { id: 6, item: '(-) Despesas Fixas', children: [ { id: 61, item: 'Salários e Encargos Adm.', base: 40000, variation: 0, isNegative: true }, { id: 62, item: 'Aluguel e Utilitários', base: 12000, variation: 100, isNegative: true } ] },
  { id: 7, item: '(=) EBITDA', isTotal: true },
  { id: 8, item: '(-) Empréstimos e Financiamentos', children: [ { id: 81, item: 'Juros Pagos', base: 3000, variation: 100, isNegative: true }, { id: 82, item: 'Amortizações', base: 5000, variation: 0, isNegative: true } ] },
  { id: 9, item: '(=) Lucro / Prejuízo', isTotal: true },
];

// Propriedade computada que gera e calcula todos os dados para a tabela.
const dreData = computed(() => {
  const dataWithValues: any[] = JSON.parse(JSON.stringify(dreStructure));
  const totals: { [key: number]: number[] } = {};

  // Gera valores para itens filhos e calcula totais dos pais
  dataWithValues.forEach(parent => {
    if (parent.children && parent.children.length > 0) {
      parent.valores = Array(7).fill(0); // 7 colunas: Total + 6 meses
      parent.children.forEach((child: any) => {
        const monthlyValues = generateMonthlyValues(child.base, child.variation, child.isNegative);
        child.valores = [sumValues(monthlyValues), ...monthlyValues]; // Adiciona a coluna Total
        for (let i = 0; i < 7; i++) {
          parent.valores[i] += child.valores[i];
        }
      });
    }
  });

  // Calcula os totais do DRE seguindo a nova lógica financeira
  totals[3] = dataWithValues[0].valores.map((v: number, i: number) => v + dataWithValues[1].valores[i]); // Lucro Bruto
  totals[5] = totals[3].map((v: number, i: number) => v + dataWithValues[3].valores[i]); // Margem de Contribuição
  totals[7] = totals[5].map((v: number, i: number) => v + dataWithValues[5].valores[i]); // EBITDA
  totals[9] = totals[7].map((v: number, i: number) => v + dataWithValues[7].valores[i]); // Lucro / Prejuízo

  dataWithValues.forEach(item => {
    if (item.isTotal) {
      item.valores = totals[item.id];
    }
  });

  return dataWithValues;
});


// 2. LÓGICA DA TABELA EXPANSÍVEL
// =================================
const expanded = ref<number[]>([]);

function toggle(id: number) {
  const index = expanded.value.indexOf(id);
  if (index > -1) {
    expanded.value.splice(index, 1);
  } else {
    expanded.value.push(id);
  }
}
</script>

<style scoped>
/* Estilo para habilitar a rolagem horizontal na tabela */
.table-wrapper {
  overflow-x: auto;
}
</style>
