<template>
    <BaseCard title="Usuários">
  
      <v-data-table
        :headers="cabecalhos"
        :items="dados"
        :loading="carregando"
        loading-text="Carregando dados..."
        no-data-text="Nenhum dado para exibir"
        class="bg-secondary"
      >
        <template v-slot:item.status="{ value }">
          <v-chip :color="value === 'ativo' ? 'success' : 'grey'">
            {{ value }}
          </v-chip>
        </template>

        <template v-slot:item.acoes="{ item }">
          <div class="d-flex justify-end">

            <v-tooltip text="Editar">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-pencil" size="small" variant="text" color="primary" @click="editarItem(item)"></v-btn>
              </template>
            </v-tooltip>
  
            <v-tooltip :text="item.is_active == 'Ativo' ? 'Desativar' : 'Ativar'">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props"
                  :icon="item.is_active === 'Inativo' ? 'mdi-account-off' : 'mdi-account-check'"
                  size="small" 
                  variant="text"
                  :color="item.is_active === 'Inativo' ? 'warning' : 'success'"
                  @click="toggleStatusItem(item)"
                ></v-btn>
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
          Novo Usuário
        </v-btn>
    </div>

  <EditUserModal v-model="dialogEdit" :title="myTitle" :isEditMode="editMode" :initialData="itemParaAcao"/>
  <DeleteUserModal v-model="dialogDelete" :item="itemParaAcao"/>

</template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import EditUserModal from '@/components/modal/EditUserModal.vue'
  import { userService } from '@/services';
  import { useFormatters } from '@/composables/useFormatters';
  import { useUserStore } from '@/stores';
  
  const userDataStore = useUserStore();
  const { users, myUser } = storeToRefs(userDataStore);
  
  const dialogEdit = ref(false);
  const dialogDelete = ref(false);
  const itemParaAcao = ref<any | null>(null);
  
  const myTitle = ref<string>('');
  const editMode = ref(false);
  
  const { formatDate } = useFormatters()

  const carregando = computed(() => users.value.length === 0);
  const dados = computed(() => {
    return users.value.filter(f => f.id !== myUser.value?.id).map(user => {
      return {
        id: user.id,
        tenant: user.tenant?.nome_fantasia || 'Não informado', 
        nome: user.nome,
        email: user.email,
        is_active: user.is_active ? 'Ativo' : 'Inativo',
        ultimoAcesso: user.last_login ? formatDate(user.last_login) : null
      };
    });
  });

  const cabecalhos = ref([
    { title: 'Cliente', key: 'tenant', align: 'start' },
    { title: 'Usuário', key: 'nome', align: 'start' },
    { title: 'E-mail', key: 'email', align: 'start' },
    { title: 'Status', key: 'is_active', align: 'start'},
    { title: 'Último Acesso', key: 'ultimoAcesso', align: 'start' },
    { title: 'Ações', key: 'acoes', align: 'end', sortable: false },
  ] as const );
  
  function criarItem() {
    myTitle.value = 'Criar usuário'
    editMode.value = false
    itemParaAcao.value = null
    dialogEdit.value = true;
  }
  
  function editarItem(item: any) {
    myTitle.value = 'Alterar informações do usuário'
    editMode.value = true
    itemParaAcao.value = item
    dialogEdit.value = true;
  }
  
  async function toggleStatusItem(item: any) {
    const originalStatus = item.is_active === 'Ativo' ? true : false;
    const newStatus = !originalStatus;
    try {
      await userService.updateStatus(item.id, newStatus);
      await userDataStore.fetchAllUsers(true)
    } catch (error) {
      item.is_active = originalStatus ? 'Ativo' : 'Inativo';
    }
  }

  function excluirItem(item: any) {
    itemParaAcao.value = item;
    dialogDelete.value = true;
  }

</script>