<template>
  <v-app>
    <v-main class="bg-background" style="min-height: 100vh;">
      <v-container class="py-6" style="max-width: 98%;">
        <v-sheet elevation="6" rounded="lg" class="d-flex" style="overflow: hidden;">
          <Sidebar />

          <div class="flex-grow-1 d-flex flex-column">
            <div class="d-flex justify-space-between align-center px-6 py-4 bg-lightbackground">
              <h1 
                class="text-h4 font-weight-bold m-0 text-primary"
                style="text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);"
              >
                {{ currentPageTitle }}
              </h1>

              <UserMenu />
            </div>

            <v-main class="pa-6 bg-lightbackground" style="min-height: calc(100vh - 140px);">
              <router-view />
              <BaseSnackbar />
            </v-main>
          </div>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Sidebar from '@/components/default/Sidebar.vue'
import UserMenu from '@/components/default/UserMenu.vue'
import BaseSnackbar from '@/components/default/BaseSnackbar.vue';

const route = useRoute()

const navItems = [
  { title: 'Financeiro', route: '/financeiro' },
  { title: 'Lucratividade', route: '/lucratividade' },
  { title: 'Pagamentos', route: '/pagamentos' },
  { title: 'Resultados', route: '/resultados' },
  { title: 'Administração', route: '/administracao' },
  { title: 'Administração > Sistemas integrados', route: '/administracao/sistemas' },
  { title: 'Administração > Clientes', route: '/administracao/clientes' },
  { title: 'Administração > Usuários', route: '/administracao/usuarios' }
]

const currentPageTitle = computed(() => {
  const match = navItems.find(item => item.route === route.path)
  return match?.title || 'MVCore'
})
</script>