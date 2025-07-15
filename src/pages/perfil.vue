<template>
  <v-container class="d-flex justify-center">
    <v-card flat max-width="600px" class="w-100 pa-6 bg-secondary">
      <v-card-title class="text-h5 text-primary">
        Meu perfil
      </v-card-title>
      <v-card-subtitle class="text-primary">Suas informações de cadastro.</v-card-subtitle>

      <v-card-text>
        <div v-if="carregando" class="text-center pa-8">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          <p class="mt-8 text-primary">Carregando suas informações...</p>
        </div>

        <div v-else>
          <v-list lines="two" class="bg-secondary">
            <v-list-item class="text-primary">
              <template #prepend>
                <v-icon>mdi-account</v-icon>
              </template>
              
              <v-list-item-title>Nome completo</v-list-item-title>
              <v-list-item-subtitle>{{ myUser?.nome }}</v-list-item-subtitle>
              
              <template #append>
                <v-btn
                  icon="mdi-pencil"
                  variant="text"
                  color="primary"
                  size="small"
                  @click="abrirModalAlterarUsuario"
                ></v-btn>
              </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item class="text-primary">
              <template #prepend>
                <v-icon>mdi-email</v-icon>
              </template>
              <v-list-item-title>E-mail</v-list-item-title>
              <v-list-item-subtitle>{{ myUser?.email }}</v-list-item-subtitle>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item
              title="Empresa"
              :subtitle="getTenantDisplayName(myUser?.tenant)"
              prepend-icon="mdi-domain"
              class="text-primary"
            ></v-list-item>
          </v-list>

          <div class="text-center">
            <v-btn class="bg-primary mt-6" @click="abrirModalAlterarSenha">
              Alterar Senha
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>

  <EditUserModal v-model="isDialogOpenUser" :title="titleEditUser" :isEditMode="editMode" :initialData="myUser"/>
  <ChangePasswordModal v-model="isDialogOpenPassword" :title="titleEditPassword" :isEditMode="editMode" :initialData="myUser"/>
</template>


<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';


import { useUserStore, useSnackbarStore } from '@/stores';
import ChangePasswordModal from '@/components/modal/ChangePasswordModal.vue';
import { useFormatters } from '@/composables/useFormatters';
import EditUserModal from '@/components/modal/EditUserModal.vue';
import { SYSTEM_MESSAGES } from '@/constants/messages';

const userDataStore = useUserStore();
const { myUser } = storeToRefs(userDataStore);
const snackbarDataStore = useSnackbarStore();

const { getTenantDisplayName } = useFormatters()


const isDialogOpenPassword = ref(false);
const isDialogOpenUser = ref(false);
const titleEditPassword = ref<string>('');
const titleEditUser = ref<string>('');
const editMode = ref(true);
const id = ref<string | null>(null);

function abrirModalAlterarSenha() {
  titleEditPassword.value = `Alterar senha`;
  isDialogOpenPassword.value = true;
}

function abrirModalAlterarUsuario() {
  titleEditUser.value = `Alterar nome`;
  isDialogOpenUser.value = true;
}

const carregando = computed(() => !myUser.value);

onMounted(
  async () => {
    try {
      await userDataStore.fetchMyUser();
    } catch (error) {
      snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.ERROR.SERVER_UNAVAILABLE, 'error');      
    }
});

</script>

<style scoped>
</style>
