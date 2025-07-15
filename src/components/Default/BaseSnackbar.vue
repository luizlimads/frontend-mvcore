<template>
    <v-snackbar
      v-model="show"
      :timeout="5000"
      :color="color"
      location="top right"
      variant="elevated"
    >
      {{ text }}
  
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbarStore.show = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
</template>
  
  <script lang="ts" setup>
  import { useSnackbarStore } from '@/stores/snackbarStore';
  import { storeToRefs } from 'pinia';
  
  const snackbarStore = useSnackbarStore();
  
  const { show, text, color } = storeToRefs(snackbarStore);
  </script>