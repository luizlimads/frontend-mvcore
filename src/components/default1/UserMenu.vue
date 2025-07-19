<template>
  <div class="align-center">
    <span class="font-weight-medium mr-3 text-primary">
      {{ `${myUser?.nome} - ${getTenantDisplayName(myUser?.tenant)}` }}
    </span>

    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="bg-secondary" elevation="2">
          <v-icon color="primary" size="36">mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list class="bg-secondary text-primary">
        <v-list-item
          title="Meu perfil"
          prepend-icon="mdi-account"
          @click="$router.push('/perfil')"
        ></v-list-item>
        <v-list-item
          title="Sair"
          prepend-icon="mdi-exit-to-app"
          @click="fazerLogout"
        ></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import { useAuthStore ,useUserStore } from '@/stores';
  import { authService } from '@/services'
  import { useFormatters } from '@/composables/useFormatters';

  const userStore = useUserStore();
  const authStore = useAuthStore();
  const { getTenantDisplayName } = useFormatters()

  const { myUser } = storeToRefs(userStore);

  function fazerLogout() {
    authService.logout();
    authStore.logout();
  }

  onMounted(
    async () => {
        await userStore.fetchMyUser();
    }
  );
</script>