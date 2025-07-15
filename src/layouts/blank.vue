<template>
  <v-app>
    <v-main class="bg-background" style="min-height: 100vh;">
      <v-container class="py-6" style="max-width: 98%;">
        <v-sheet elevation="6" rounded="lg" class="d-flex" style="overflow: hidden; height: 90vh;">
          <router-view />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>