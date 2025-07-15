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

<script setup lang="ts">
  import { ref, reactive, computed, watch, nextTick } from 'vue';
  import { storeToRefs } from 'pinia';
  import type { VForm } from 'vuetify/components';

import { tenantService } from '@/services';
import { useErpStore, useTenantStore, useUserStore , useSnackbarStore } from '@/stores';
import { baseFields, systemSpecificFields } from '@/form-configs/tenant-form'; 
import { VALIDATION_CONSTANTS } from '@/constants/validators';
import { parseApiError } from '@/utils/apiErrorParser';

import type { FormField, FormConfig, Tenant } from "@/type";
import { SYSTEM_MESSAGES } from '@/constants/messages';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  initialData: {
    type: Object as PropType<Tenant | null>,
    default: null
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
});

  const erpDataStore = useErpStore();
  const { erps } = storeToRefs(erpDataStore);

  const tenantDataStore = useTenantStore();
  const { tenants } = storeToRefs(tenantDataStore);

  const userDataStore = useUserStore();

  const snackbarDataStore = useSnackbarStore();

  const dialogModal = defineModel<boolean>({ default: false });
  const form = ref<VForm | null>(null);
  const loading = ref(false);
  const formData = reactive<Record<string, any>>({});

  const formConfig = computed<FormConfig>(() => {
    const finalFields: FormField[] = [...baseFields];
    const selectedErp = erps.value.find(erp => erp.id === formData.sistema_integrado);
    if (selectedErp) {
      const specificFields = systemSpecificFields[selectedErp.nome.toLowerCase()];
      if (specificFields) {
        finalFields.push(...specificFields);
      }
    }
    const selectField = finalFields.find(f => f.key === 'sistema_integrado');
    if (selectField) {
      selectField.props.items = erps.value.filter(f => f.id !== VALIDATION_CONSTANTS.ERP.ID_ADMIN);
    }
    return {
      title: props.title,
      fields: finalFields,
    };
  });

  const submitButtonText = computed(() => props.isEditMode ? 'Salvar Alterações' : 'Cadastrar');

  async function populateForm() {
    Object.keys(formData).forEach(key => delete formData[key]);
    const tenantToEdit = props.initialData?.id ? tenants.value.find(f => f.id === props.initialData?.id) : null;
    if(tenantToEdit) {
      formData.sistema_integrado = tenantToEdit.sistema_integrado;
      await nextTick();
      formConfig.value.fields.forEach(field => {
        formData[field.key] = tenantToEdit[field.key as keyof Tenant] ?? null;
      });
    }
  }

  watch(() => dialogModal.value, (isAberto) => {
    if (isAberto) {
      populateForm();
    }
  }, { immediate: true });

  async function submitForm() {
    const { valid } = await form.value?.validate() ?? { valid: false };
    if (!valid) return;
    loading.value = true;
    try {
      let message = '';
      if (props.isEditMode && props.initialData) {
        await tenantService.update(props.initialData.id, formData);
        message = SYSTEM_MESSAGES.SUCCESS.UPDATE_TENANT;
      } else {
        await tenantService.create(formData);
        message = SYSTEM_MESSAGES.SUCCESS.CREATE_TENANT;
      }
      dialogModal.value = false;
      snackbarDataStore.showSnackbar(message, 'success');
      await tenantDataStore.fetchAllTenants(true);
      await userDataStore.fetchAllUsers(true);
      await userDataStore.fetchMyUser(true);
    } catch (apiError: any) {
      const friendlyErrorMessage = parseApiError(apiError)
      snackbarDataStore.showSnackbar(friendlyErrorMessage, 'error');
    } finally {
      loading.value = false;
    }
  }
</script>
