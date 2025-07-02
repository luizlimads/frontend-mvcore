<template>
  <v-card elevation="2" rounded="lg">
    <v-data-table
      :headers="headers"
      :items="displayItems"
      item-value="id"
      hide-default-footer
      class="elevation-0 custom-table-style" >
      <template v-slot:item.name="{ item }">
        <div class="d-flex align-center" :style="{ paddingLeft: `${item.level * 24}px` }">
          <v-icon
            v-if="item.hasChildren"
            :icon="isExpanded(item.id) ? 'mdi-chevron-down' : 'mdi-chevron-right'"
            size="small"
            class="mr-2"
            @click.stop="toggleRow(item.id)"
          ></v-icon>
          <v-icon v-else size="small" class="mr-2"></v-icon>
          <span>{{ item.name }}</span>
        </div>
      </template>

      <template v-slot:item.value="{ item }">
        <span class="font-weight-bold" v-if="item.value != null">
          {{ formatCurrency(item.value) }}
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { useFormatters } from '@/composables/useFormatters';

  interface Props {
    rawData: object;
  }

  const props = defineProps<Props>();

  interface TableItem {
    id: string;
    name: string;
    value: number | null;
    level: number;
    parentId: string | null;
    hasChildren: boolean;
  }

  const { formatCurrency } = useFormatters();
  const headers = [
    { title: 'Descrição', key: 'name', sortable: false },
    { title: 'Valor', key: 'value', align: 'end', sortable: false },
  ] as const;

  const flatData = ref<TableItem[]>([]);
  const expandedRows = ref(new Set<string>());

  function flattenObject(obj: any, level = 0, parentId: string | null = null): TableItem[] {
    let result: TableItem[] = [];
    if (!obj) return result;
    for (const key in obj) {
      // Ignoramos as chaves de "total" que vêm do backend para recalcular tudo
      if (key.toLowerCase().includes('total') || key === 'descricao') continue;

      const value = obj[key];
      const id = parentId ? `${parentId}-${key}` : key;
      const isObject = typeof value === 'object' && value !== null;

      const item: TableItem = {
        id,
        name: key,
        value: !isObject && typeof value === 'number' ? value : null, // Só atribui valor se for um número
        level,
        parentId,
        hasChildren: isObject,
      };
      result.push(item);

      if (isObject) {
        result = result.concat(flattenObject(value, level + 1, id));
      }
    }
    return result;
  }

  function calculateParentTotals(items: TableItem[]): TableItem[] {
    const valueMap = new Map<string, number>();

    // Percorremos a lista DE TRÁS PARA FRENTE (de baixo para cima na hierarquia)
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      let currentValue = 0;

      if (item.hasChildren) {
        // Se for um pai, seu valor é a soma dos filhos já calculados
        const children = items.filter(child => child.parentId === item.id);
        currentValue = children.reduce((sum, child) => sum + (valueMap.get(child.id) || 0), 0);
      } else {
        // Se for uma folha, seu valor é o que já está definido
        currentValue = item.value || 0;
      }
      valueMap.set(item.id, currentValue);
    }

    // Retorna uma nova lista com os valores atualizados
    return items.map(item => ({
      ...item,
      value: valueMap.get(item.id) ?? null,
    }));
  }


watch(() => props.rawData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    // Primeiro, mapeia a estrutura
    const initialFlatData = flattenObject(newData);
    // Depois, calcula os totais e atualiza o estado final
    flatData.value = calculateParentTotals(initialFlatData);
    
    // Opcional: expandir os nós de primeiro nível por padrão
    flatData.value.forEach(item => {
      if (item.level === 0) {
        expandedRows.value.add(item.id);
      }
    });
  }
}, { immediate: true, deep: true });

  const displayItems = computed(() => {
    return flatData.value.filter(item => {
      if (item.level === 0) return true;
      let currentParentId = item.parentId;
      while (currentParentId !== null) {
        if (!expandedRows.value.has(currentParentId)) return false;
        const parent = flatData.value.find(p => p.id === currentParentId);
        currentParentId = parent ? parent.parentId : null;
      }
      return true;
    });
  });

  function toggleRow(id: string) {
    if (expandedRows.value.has(id)) {
      expandedRows.value.delete(id);
    } else {
      expandedRows.value.add(id);
    }
  }

  function isExpanded(id: string): boolean {
    return expandedRows.value.has(id);
  }
</script>

<style>
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td, .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border-bottom: none;
}
.custom-table-style {
  background-color: white !important; /* Garante o fundo branco */
  color: black !important; /* Garante a cor do texto principal */
}

.custom-table-style thead th {
  color: black !important; /* Garante a cor do texto do cabeçalho */
}

.custom-table-style tbody tr td {
  color: black !important; /* Garante a cor do texto das células */
  border-bottom: 1px solid #e0e0e0; /* Adiciona uma linha de separação sutil entre as linhas */
}

.custom-table-style tbody tr:last-child td {
  border-bottom: none; /* Remove a linha da última célula */
}
</style>