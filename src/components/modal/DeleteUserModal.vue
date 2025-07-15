<template>
  <BaseModal
    v-model="dialogModal"
    title="Deseja excluir este usuário?"
    primaryLabel="Excluir"
    :onPrimaryAction="handleConfirm"
  >
    <v-card-text class="mt-2">
      Você tem certeza que deseja excluir o usuário <strong>{{ itemName }}</strong>? Essa ação não pode ser desfeita.
    </v-card-text>
  </BaseModal>
</template>

<script setup lang="ts">
  import { useUserStore, useSnackbarStore } from '@/stores';
  import { SYSTEM_MESSAGES } from '@/constants/messages';
import { userService } from '@/services';

  const props = defineProps<{
    item: any | null;
    itemNameKey?: string;
    onSuccess?: () => void;
  }>();

  const emit = defineEmits([]);
  const dialogModal = defineModel<boolean>({ required: true });

  const snackbar = useSnackbarStore();
  const userStore = useUserStore();

  const itemName = computed(() => {
    if (!props.item) return '';
    const key = props.itemNameKey || 'nome';
    return props.item[key] || 'este item';
  });

  async function handleConfirm() {
    if (!props.item || !props.item.id) return;

    try {
      await userService.delete(props.item.id);
      snackbar.showSnackbar(SYSTEM_MESSAGES.SUCCESS.DELETE_USER, 'success');
      await userStore.fetchAllUsers(true);
    } catch (e) {
      snackbar.showSnackbar(SYSTEM_MESSAGES.ERROR.GENERAL, 'error');
    } finally {
      dialogModal.value = false;
    }
  }
</script>
