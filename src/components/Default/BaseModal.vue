<template>
  <v-dialog v-model="internalValue" persistent max-width="500px">
    <BaseCard>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">{{ title }}</span>
        <v-btn icon="mdi-close" variant="text" @click="emitClose" />
      </v-card-title>

      <v-divider />

      <slot />

      <v-divider />

      <v-card-actions class="justify-end mt-6">
        <v-btn variant="text" class="text-primary bg-secondary" @click="emitClose">
          Cancelar
        </v-btn>
        <v-btn variant="flat" class="bg-primary" @click="onPrimaryAction">
          {{ primaryLabel }}
        </v-btn>
      </v-card-actions>
    </BaseCard>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  title: string;
  primaryLabel: string;
  onPrimaryAction: () => void;
}>();

const emit = defineEmits(['update:modelValue']);

// Criamos um valor interno reativo e sincronizado
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function emitClose() {
  emit('update:modelValue', false);
}
</script>
