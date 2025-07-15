<template>
  <BaseModal
    v-model="dialogModal"
    :title="formConfig.title"
    :primaryLabel="submitButtonText"
    :onPrimaryAction="submitForm"
  >
    <v-form ref="form" @submit.prevent="submitForm">
      <v-card-text class="mt-6">
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
  import { ref, reactive, computed, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import type { VForm } from 'vuetify/components';

  import { userService } from '@/services';
  import { useTenantStore, useUserStore, useSnackbarStore } from '@/stores';
  import { baseFields, createFields } from '@/form-configs/user-form'; 
  import type { FormField, FormConfig, User } from "@/type"
  import { SYSTEM_MESSAGES } from '@/constants/messages';
  import { parseApiError } from '@/utils/apiErrorParser';
  import { VALIDATION_CONSTANTS } from '@/constants/validators';


  const props = defineProps({
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

  const tenantDataStore = useTenantStore();
  const { tenants } = storeToRefs(tenantDataStore);
  
  const userDataStore = useUserStore();
  const { myUser } = storeToRefs(userDataStore);
  
  const snackbarDataStore = useSnackbarStore();

  const dialogModal = defineModel<boolean>({ default: false });
  const form = ref<VForm | null>(null);
  const loading = ref(false);
  const formData = reactive<Record<string, any>>({});

  const formConfig = computed<FormConfig>(() => {
    const finalFields: FormField[] = [...baseFields];
    
    if (!props.isEditMode) finalFields.push(...createFields);

    const selectField = finalFields.find(f => f.key === 'tenant');
    if (selectField) {
      selectField.props.items = tenants.value.filter(f => f.id !== VALIDATION_CONSTANTS.TENANT.ID_ADMIN);
    }
    return {
      title: props.title,
      fields: finalFields,
    };
  });

  const submitButtonText = computed(() => props.isEditMode ? 'Salvar Alterações' : 'Cadastrar');

  function populateForm() {    
    Object.keys(formData).forEach(key => delete formData[key]);

    formConfig.value.fields.forEach(field => {
      formData[field.key] = props.initialData?.[field.key as keyof User] ?? null;
    });
  }

  watch(() => dialogModal.value, (isAberto) => {
    if (isAberto) {
      populateForm();
    }
  });

  async function submitForm() {
    const { valid } = await form.value?.validate() ?? { valid: false };

    if (!valid) return;
    loading.value = true;
    try {
      if(props.isEditMode) {
        await userService.update(props.initialData?.id, formData);
        snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.SUCCESS.UPDATE_USER, 'success');
      } else {
        await userService.create(formData);
        snackbarDataStore.showSnackbar(SYSTEM_MESSAGES.SUCCESS.CREATE_USER, 'success');
      }
      if(myUser.value?.id === props.initialData?.id) await userDataStore.fetchMyUser(true);
      await userDataStore.fetchAllUsers(true);

      dialogModal.value = false;
    } catch (apiError: any) {
      const friendlyErrorMessage = parseApiError(apiError)
      snackbarDataStore.showSnackbar(friendlyErrorMessage, 'error');      
    } finally {
      loading.value = false;
    }
  }

  watch(
    [() => formData.email, () => formData.tenant], 
    ([newEmail, newTenantId]) => {
      if (newEmail && newTenantId && !formData.password) {
        const userPart = newEmail.split("@")[0].toLowerCase();
        const tenant = tenants.value.find(t => t.id === newTenantId);
        const tenantPart = tenant ? tenant.nome_fantasia.split(" ")[0].toLowerCase() : '';
        formData.password = `${userPart}_${tenantPart}`;
      }
    }
  );
</script>
