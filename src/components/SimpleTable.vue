<template>
  <v-data-table
  :headers="headers"
  :items="items"
  :search="search"
  :loading="loading"
  item-value="id"
  class="elevation-1"
  hover
>
  <template v-slot:item.ativo="{ item }">
    <v-chip :color="item.ativo ? 'green' : 'red'" variant="elevated" size="small">
      {{ item.ativo ? 'Sim' : 'Não' }}
    </v-chip>
  </template>

  <template v-slot:item.actions="{ item }">
    <v-icon-button @click="editItem(item)" density="compact">
      <v-icon>mdi-pencil</v-icon>
      <v-tooltip activator="parent" location="top">Editar</v-tooltip>
    </v-icon-button>
    <v-icon-button @click="deleteItem(item)" density="compact">
      <v-icon>mdi-delete</v-icon>
      <v-tooltip activator="parent" location="top">Excluir</v-tooltip>
    </v-icon-button>
  </template>
</v-data-table>
</template>

<script lang="ts" setup>
const headers = [
  { title: 'Descrição', key: 'descricao', align: 'start' },
  { title: 'Marca', key: 'marca' },
  { title: 'Grupo', key: 'grupo' },
  { title: 'Referência', key: 'referencia' },
  { title: 'GTIN', key: 'gtin' },
  { title: 'Ativo', key: 'ativo', align: 'center' },
  // Nova coluna de ações, sem 'key' de dados, pois é customizada
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' },
  ];
  import { ref, onMounted } from 'vue';
  import { apiService, type Item } from '@/services/apiService';

  const loading = ref<boolean>(true); // Começa como true para mostrar o loader inicial
  const error = ref<string | null>(null); // Para armazenar mensagens de erro
  const items = ref<Item[]>([]);
  const loadItems = async () => {
    items.value = await apiService.fetchProdutos();
  }

  onMounted(() => {
    loadItems();
  });

  
</script>