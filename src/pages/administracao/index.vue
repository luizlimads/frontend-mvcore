<template>
  <div class="d-flex flex-column">
    <v-row>
      <v-col cols="12" md="6" class="ma-3">
        <BaseCard
          title="Acessar como cliente"
          subtitle="Escolha um cliente para simular sua visualização"
        >
        <v-form ref="form" v-model="isFormValid" class="d-flex align-center" @submit.prevent="salvarTenant">
          <v-select
            label="Selecione um cliente"
            v-model="formData.tenant"
            :items="tenants"
            item-value="id"
            variant="outlined"
            density="compact"
            class="mr-4 mt-5"
            :rules="[v => !!v || 'É necessário selecionar um cliente.']"
          >
            <template v-slot:selection="{ item }">
              <span>{{ getTenantDisplayName(item.raw) }}</span>
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :title="getTenantDisplayName(item.raw)" />
            </template>
          </v-select>
          
          <v-btn type="submit" color="primary" size="default">OK</v-btn>
        </v-form>          
        </BaseCard>
      </v-col>
    </v-row>

    <v-divider class="mt-8 mb-8" />
    <div class="d-flex gap-6">
      <ClickCard
        icon="mdi-monitor-dashboard"
        label="Sistemas Integrados"
        @click="$router.push('/administracao/sistemas')"
      />
      <ClickCard
        icon="mdi-domain"
        label="Clientes"
        @click="$router.push('/administracao/clientes')"
      />
      <ClickCard
        icon="mdi-account-group"
        label="Usuários"
        @click="$router.push('/administracao/usuarios')"
      />
    </div>
  </div>

</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useTenantStore, useUserStore, useSnackbarStore } from '@/stores';
  import { userService } from '@/services';
  import { useFormatters } from '@/composables/useFormatters';
  import { SYSTEM_MESSAGES } from '@/constants/messages';

  const tenantDataStore = useTenantStore();
  const { tenants } = storeToRefs(tenantDataStore);

  const userDataStore = useUserStore();
  const { myUser } = storeToRefs(userDataStore);

  const snackbarDataStore = useSnackbarStore();
  
  const { getTenantDisplayName } = useFormatters();
  const form = ref();
  const isFormValid = ref(false);

  const formData = reactive({
    tenant: null as string | null,
  });

  async function salvarTenant(){
    const isValid = await form.value?.validate();
    if (!isValid?.valid) return;

    try {
      await userService.update(myUser.value?.id, formData);
      snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.SUCCESS.UPDATE_TENANT, 'success');
      await userDataStore.fetchMyUser(true);
    } catch (apiError: any) {
      snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.ERROR.GENERAL, 'error');
    }
  }

  onMounted(
    async () => {
      try {
        await tenantDataStore.fetchAllTenants();
        await userDataStore.fetchMyUser();
      } catch (error) {
        snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.ERROR.SERVER_UNAVAILABLE, 'error');      
      }
    }  
  )

</script>