<template>
  <BaseModal
    v-model="dialogModal"
    :title="formConfig.title"
    :primaryLabel="submitButtonText"
    :onPrimaryAction="submitForm"
  >
    <v-form ref="form">
      <v-card-text class="mt-4">
        <component
          v-for="field in formConfig.fields"
          :key="field.key"
          :is="field.component"
          v-model="formData[field.key]"
          v-bind="field.props"
          :rules="field.rules"
          density="comfortable"
          class="mb-4"
        />
        <small>*Campo obrigatório</small>
      </v-card-text>
    </v-form>
  </BaseModal>
</template>

<script lang="ts" setup>
  import type { VForm } from 'vuetify/components';
  import { userService } from '@/services';
  import { useSnackbarStore } from '@/stores';
  import { baseFields, editFields } from '@/form-configs/password-form';
  import type { FormField, FormConfig, User } from "@/type"
  import { confirmationRule } from '@/validators';
  import { parseApiError } from '@/utils/apiErrorParser';
 
  import { SYSTEM_MESSAGES } from '@/constants/messages';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    initialData: {
      type: Object as PropType<User | null>,
      default: null
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const dialogModal = computed({
    get: () => props.modelValue,
    set: (val: boolean) => emit('update:modelValue', val),
  });

  const form = ref<VForm | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const snackbarDataStore = useSnackbarStore();
  const submitButtonText = 'Salvar alterações';

  const formData = reactive<any>({
      current_password: '',
      new_password: '',
      re_new_password: '',
  });

  const passwordVisibility = reactive<Record<string, boolean>>({
      new_password: false,
      re_new_password: false,
  });

  const formConfig = computed<FormConfig>(() => {
      const finalFields: FormField[] = [
          ...(props.isEditMode ? editFields : []),
          ...baseFields
      ];

      const confirmationField = finalFields.find(f => f.key === 're_new_password');
      if (confirmationField) {
          const confirmRule = confirmationRule(formData.new_password, 'As senhas não conferem.');
          confirmationField.rules = [confirmRule];
      }

      finalFields.forEach(field => {
          if (field.key === 'current_password' || field.key === 'new_password' || field.key === 're_new_password') {
            const isVisible = passwordVisibility[field.key];

            field.props = {
              ...field.props,
              type: isVisible ? 'text' : 'password',
              appendInnerIcon: isVisible ? 'mdi-eye-off' : 'mdi-eye',
              autocomplete: 'off',
              'onClick:appendInner': () => togglePasswordVisibility(field.key),
            };
          }
      });

      return {
          title: props.title,
          fields: finalFields,
      };
  });

  function togglePasswordVisibility(key: string) {
      passwordVisibility[key] = !passwordVisibility[key];
  }

  watchEffect(() => {
    if (dialogModal.value) {
      nextTick(() => {
        form.value?.resetValidation?.();
        Object.keys(formData).forEach(key => {
          formData[key] = '';
        });
      });
    }
  });

  async function submitForm() {
    const { valid } = await form.value?.validate() ?? { valid: false };

    if (!valid) return;

    loading.value = true;
    error.value = null;
    let response = null
    let message = ''
    type SnackbarColor = 'success' | 'error' | 'warning' | 'info';
    const snackbarColor = ref<SnackbarColor>('success');
    try {
      response = await userService.updatePassword(formData);
      message = SYSTEM_MESSAGES.SUCCESS.UPDATE_PASSWORD
      snackbarColor.value = 'success'
      dialogModal.value = false;
    } catch (apiError: any) {
      const friendlyErrorMessage = parseApiError(apiError)
      snackbarDataStore.showSnackbar(friendlyErrorMessage, 'error');
    } finally {
      loading.value = false;
    }
  }
</script>