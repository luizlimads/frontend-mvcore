<template>
    <BaseCard title="Clientes">

      <v-data-table
        :headers="cabecalhos"
        :items="dados"
        :loading="carregando"
        loading-text="Carregando dados..."
        no-data-text="Nenhum dado para exibir"
        class="bg-secondary"
      >
        <template v-slot:item.acoes="{ item }">
          <div class="d-flex justify-end">

            <v-tooltip text="Editar">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-pencil" size="small" variant="text" color="primary" @click="editarItem(item)"></v-btn>
              </template>
            </v-tooltip>
    
            <v-tooltip text="Excluir">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-delete" size="small" variant="text" color="error" @click="excluirItem(item)"></v-btn>
              </template>
            </v-tooltip>
          </div>
        </template>
  
      </v-data-table>

    </BaseCard>

    <div class="d-flex justify-end pa-4">
        <v-btn color="primary" @click="criarItem">
          <v-icon left>mdi-plus</v-icon>
          Novo cliente
        </v-btn>
    </div>

  <EditTenantModal v-model="dialogEdit" :title="myTitle" :isEditMode="editMode" :initialData="itemParaAcao"/>
  <DeleteTenantModal v-model="dialogDelete" :item="itemParaAcao" />

</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  
  import { useTenantStore, useErpStore } from '@/stores';
  import EditTenantModal from '@/components/modal/EditTenantModal.vue'
  import { useFormatters } from '@/composables/useFormatters';
  import { VALIDATION_CONSTANTS } from '@/constants/validators';

  
  const tenantDataStore = useTenantStore();
  const { tenants } = storeToRefs(tenantDataStore);
  const { getTenantDisplayName, formatDate } = useFormatters();

  const erpDataStore = useErpStore();
  const { erps } = storeToRefs(erpDataStore);
  
  const dialogEdit = ref(false);
  const dialogDelete = ref(false);
  const itemParaAcao = ref<any | null>(null);
  
  const myTitle = ref<string>('');
  const editMode = ref(false);
    
  const carregando = computed(() => tenants.value.length === 0);
  const dados = computed(() => {
    return tenants.value.filter(f => f.id !== VALIDATION_CONSTANTS.TENANT.ID_ADMIN).map(tenant => {
      return {
        id: tenant.id,
        nome: getTenantDisplayName(tenant),
        documento: tenant.documento,
        sistema_integrado: erps.value.find(f => f.id === tenant.sistema_integrado)?.nome,
        data_criacao: tenant.data_criacao ? formatDate(tenant.data_criacao) : null,
        qtdUsers: 10,
      };
    });
  });

  // Definição dos Cabeçalhos tabela
  const cabecalhos = ref([
    { title: 'Nome', key: 'nome', align: 'start' },
    { title: 'Documento', key: 'documento', align: 'start'},
    { title: 'Usuários ativos', key: 'qtdUsers', align: 'start' },
    { title: 'Sistema utilizado', key: 'sistema_integrado', align: 'start' },
    { title: 'Cliente desde', key: 'data_criacao', align: 'start' },
    { title: 'Ações', key: 'acoes', align: 'end', sortable: false },
  ] as const );
  
  function criarItem() {
    myTitle.value = 'Cadastrar cliente'
    editMode.value = false
    itemParaAcao.value = null
    dialogEdit.value = true;
  }
  
  function editarItem(item: any) {
    myTitle.value = 'Atualizar informações do cliente'
    editMode.value = true
    itemParaAcao.value = item
    dialogEdit.value = true;
  }
    
  function excluirItem(item: any) {
    itemParaAcao.value = item;
    dialogDelete.value = true;
  }
</script>
