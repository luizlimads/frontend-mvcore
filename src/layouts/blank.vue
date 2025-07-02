<!-- src/layouts/default.vue -->
<template>
  <v-app>
    <!-- Fundo azul médio da tela inteira -->
    <v-main class="bg-primary" style="min-height: 100vh;">
      <!-- "Cartão" central (sidebar + conteúdo no mesmo card) -->
      <v-container class="py-6" style="max-width: 98%;">
        <v-sheet elevation="6" rounded="lg" class="d-flex" style="overflow: hidden; height: 90vh;" color="white">
          <router-view />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.bg-primary {
  background-color: #22415e !important;
}

.nav-hover:hover {
  background-color: #22415e !important;
}
</style>
