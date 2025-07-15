<template>
  <v-card elevation="2" rounded="lg" class="pa-2 bg-secondary text-primary" >
    <v-card-title v-if="title">{{ title }}</v-card-title>
    <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
  elevation?: number;
  rounded?: string;
}>();
</script>

<style scoped>
v-data-table :deep(td),
v-data-table {
  background-color: aquamarine;
  font-size: 0.05rem;
}

</style>