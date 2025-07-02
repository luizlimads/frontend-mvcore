<template>
  <v-dialog v-model="dialogModal" persistent max-width="600px">
    <v-card>
      <v-form ref="form" @submit.prevent="submitForm">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h5">{{ formConfig.title }}</span>
          <v-btn icon="mdi-close" variant="text" @click="dialogModal = false"></v-btn>
        </v-card-title>
        
        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="field in formConfig.fields"
                :key="field.key"
                cols="12"
              >
                <component
                  :is="field.component"
                  v-model="formData[field.key]"
                  v-bind="field.props"
                  :rules="field.rules"
                ></component>
              </v-col>
            </v-row>
          </v-container>
          <small>* indica campo obrigatório</small>
        </v-card-text>
        
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="dialogModal = false">Cancelar</v-btn>
          <v-btn color="primary" variant="flat" type="submit" :loading="loading">Cadastrar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="snackbarColor"
      location="top right"
      variant="elevated"
    >
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
</v-dialog>

  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    :color="snackbarColor"
    location="top right"
    variant="elevated"
  >
    {{ snackbarText }}

    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false">
        Fechar
      </v-btn>
    </template>
  </v-snackbar>

</template>


<script lang="ts" setup>

import {  ref, reactive, computed, onMounted} from 'vue';
import type { VForm } from 'vuetify/components';
import { apiService } from '@/services/apiService';
import { useDataStore } from '@/stores/dataStore';
import { storeToRefs } from 'pinia';
import { baseFields, systemSpecificFields } from '@/form-configs/tenant-form'; 
import type { FormField, FormConfig } from "@/type"


const dataStore = useDataStore();
const { erps } = storeToRefs(dataStore);

const dialogModal = defineModel<boolean>();
const form = ref<VForm | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');


const formData = reactive<Record<string, any>>({});

const formConfig = computed<FormConfig>(() => {

  const finalFields: FormField[] = [...baseFields];

  const selectedErp = erps.value.find(
  (erp: any) => erp.id === formData.sistema_integrado
  );

  if (selectedErp) {
  // Busca os campos específicos no mapa usando o nome do ERP
  const specificFields = systemSpecificFields[selectedErp.nome.toLowerCase()];

    if (specificFields) {
    // Se encontrou, adiciona os campos específicos à lista final
    finalFields.push(...specificFields);
    }
  }

  const selectField = finalFields.find(f => f.key === 'sistema_integrado');

  if (selectField) {
    selectField.props.items = erps.value
  }

  return {
    title: "Cadastrar Novo Parceiro",
    fields: finalFields,
  };
});


function initializeFormData() {
  Object.keys(formData).forEach(key => delete formData[key]);
  formConfig.value.fields.forEach(field => {
    formData[field.key] = null;
  });

}

initializeFormData();

async function submitForm() {
  const { valid } = await form.value?.validate() ?? { valid: false };

  if (!valid) return;
    loading.value = true;
    error.value = null;
  try {
    const response = await apiService.createTenant(formData);
    if (response && response.status === 201) {
      snackbarText.value = 'Cadastro realizado com sucesso!';
      snackbarColor.value = 'success'; // Cor verde para sucesso
      snackbar.value = true; // Exibe a notificação
      dialogModal.value = false; // Fecha o modal
      await dataStore.fetchData()
    } else {
      // Opcional: Tratar outros casos de sucesso ou respostas inesperadas
      snackbarText.value = 'Recebemos uma resposta inesperada do servidor.';
      snackbarColor.value = 'warning'; // Cor amarela para aviso
      snackbar.value = true;
    }
  } catch (apiError: any) {
      snackbarText.value = 'Recebemos uma resposta inesperada do servidor.';
      snackbarColor.value = 'warning'; // Cor amarela para aviso
      snackbar.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await dataStore.fetchData();
});
</script>