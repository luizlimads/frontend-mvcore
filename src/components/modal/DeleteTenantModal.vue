<template>
  <BaseModal
    v-model="dialogModal"
    title="Deseja excluir esse cliente?"
    primaryLabel="Excluir"
    :onPrimaryAction="handleConfirm"
  >
    <v-card-text class="mt-2">
      Você tem certeza que deseja excluir o cliente <strong>{{ props.item?.nome_fantasia || props.item?.razao_social || props.item?.documento }}</strong>?
      Essa ação não pode ser desfeita.
    </v-card-text>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTenantStore, useSnackbarStore } from '@/stores';
import { SYSTEM_MESSAGES } from '@/constants/messages';
import type { Tenant } from '@/type';
import { tenantService } from '@/services';

const props = defineProps<{
  modelValue: boolean;
  item: Tenant | null;
}>();

const emit = defineEmits(['update:modelValue']);

const snackbar = useSnackbarStore();
const tenantStore = useTenantStore();

const dialogModal = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const loading = ref(false);

async function handleConfirm() {
  if (!props.item?.id) return;

  loading.value = true;
  try {
    await tenantService.delete(props.item?.id)
    snackbar.showSnackbar(SYSTEM_MESSAGES.SUCCESS.DELETE_TENANT, 'success');
    await tenantStore.fetchAllTenants(true);
    dialogModal.value = false;
  } catch (error) {
    snackbar.showSnackbar(SYSTEM_MESSAGES.ERROR.GENERAL, 'error');
  } finally {
    loading.value = false;
  }
}
</script>
