<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-text class="d-flex justify-space-between align-center">
        <span>Cadastrar um novo Parceiro no sistema.</span>
        <v-btn color="primary" @click="isDialogOpenTenant = true">
          <v-icon left>mdi-plus</v-icon>
          Novo Parceiro
        </v-btn>
      </v-card-text>
    </v-card>
    <ModalRegisterTenant v-model="isDialogOpenTenant" />
  </v-container>
  <v-container>
    <v-card class="mb-4">
      <v-card-text class="d-flex justify-space-between align-center">
        <span>Cadastrar um novo Usuário no sistema.</span>
        <v-btn color="primary" @click="isDialogOpenUser = true">
          <v-icon left>mdi-plus</v-icon>
          Novo Usuário
        </v-btn>
      </v-card-text>
    </v-card>
    <ModalRegisterUser v-model="isDialogOpenUser" />
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ModalRegisterTenant from '@/components/ModalRegisterTenant.vue';
  import ModalRegisterUser from '@/components/ModalRegisterUser.vue';
  import type { Erps, Tenants } from '@/type';
  import { useDataStore } from '@/stores/dataStore';
  import { storeToRefs } from 'pinia';

  const dataStore = useDataStore();
  const isDialogOpenTenant = ref(false);
  const isDialogOpenUser = ref(false);
  const { erps, tenants } = storeToRefs(dataStore);

  onMounted(() => {
    dataStore.fetchData();
  });
</script>