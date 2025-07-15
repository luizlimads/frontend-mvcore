<template>
    <div class="d-flex justify-center align-center fill-height">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAlertStore } from '@/stores'
  import { SYSTEM_MESSAGES } from '@/constants/messages';

  
  const router = useRouter();
  const alertDataStore = useAlertStore()
  
  onMounted(() => {
    alertDataStore.setMessage(SYSTEM_MESSAGES.ERROR.PAGE_NOT_FOUND);
    router.replace({path: '/financeiro'});
  });
  </script>