<template>
  <div style="width: 250px" class="pa-4 bg-primary">
    <v-list dense nav class=" bg-primary">
      <v-list-item class="justify-center mb-6">
        <v-img
          src="@/assets/MV Core - LOGO SEM SLOGAN - COLOR.png"
          alt="Logo MVCore"
          max-width="160"
          contain
        />
      </v-list-item>

      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.route"
        #prepend
      >
        <v-icon class="me-2">{{ item.icon }}</v-icon>
        <v-list-item-title class="text-subtitle-1">{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-if="myUser?.is_superuser"
        key='Administração'
        to='/administracao'
        #prepend
      >
        <v-icon class="me-2">mdi-cog</v-icon>
        <v-list-item-title class="text-subtitle-1">Administração</v-list-item-title>
      </v-list-item>      
    </v-list>
  </div>
</template>

<script setup lang="ts">

  import { useUserStore } from '@/stores';
  const userStore = useUserStore();
  const { myUser } = storeToRefs(userStore);

  const navItems = [
    { title: 'Financeiro', icon: 'mdi-home', route: '/financeiro' },
    { title: 'Lucratividade', icon: 'mdi-finance', route: '/lucratividade' },
    { title: 'Resultados', icon: 'mdi-chart-pie', route: '/resultados' },
  ]
</script>
