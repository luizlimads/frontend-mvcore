<!-- src/layouts/default.vue -->
<template>
  <v-app>
    <!-- Fundo azul médio da tela inteira -->
    <v-main class="bg-primary" style="min-height: 100vh;">
      <!-- "Cartão" central (sidebar + conteúdo no mesmo card) -->
      <v-container class="py-6" style="max-width: 98%;">
        <v-sheet elevation="6" rounded="lg" class="d-flex" style="overflow: hidden;">
          <!-- Sidebar como parte do card -->
          <div style="width: 240px; background-color: #172c41; color: white;" class="pa-4">
            <v-list dense nav style="background-color: #172c41;">
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
                link
                class="rounded nav-hover"
                active-class="bg-primary text-white"
              >
                <template #prepend>
                  <v-icon>{{ item.icon }}</v-icon>
                </template>
                <v-list-item-title class="text-subtitle-1">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <!-- Área de conteúdo principal -->
          <div class="flex-grow-1 d-flex flex-column">

            <!-- Conteúdo da página -->
            <v-main class="pa-6 bg-grey-lighten-5" style="min-height: calc(100vh - 64px);">
              <router-view />
            </v-main>
          </div>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const navItems = [
  { title: 'Financeiro', icon: 'mdi-home', route: '/financeiro' },
  { title: 'Lucratividade', icon: 'mdi-finance', route: '/lucratividade' },
  { title: 'Pagamentos', icon: 'mdi-cash-multiple', route: '/pagamentos' },
  { title: 'Resultados', icon: 'mdi-chart-pie', route: '/resultados' },
  { title: 'Administração', icon: 'mdi-cog', route: '/administracao' }
]
</script>

<style scoped>
.bg-primary {
  background-color: #22415e !important;
}

.nav-hover:hover {
  background-color: #22415e !important;
}
</style>
