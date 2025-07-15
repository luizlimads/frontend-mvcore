<template>
  <v-card
    class="d-flex flex-column align-center justify-center ma-3 bg-secondary"
    elevation="2"
    rounded="lg"
    height="200"
    width="200"
    role="button"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
  >
    <v-icon
      :size="iconSize"
      color="primary"
      class="mb-4"
    >
      {{ icon }}
    </v-icon>

    <div class="text-primary font-weight-medium text-body-1">
      {{ label }}
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  iconSize: {
    type: [Number, String],
    default: 64
  }
})
</script>
