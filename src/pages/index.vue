<route lang="yaml">
  meta:
    layout: blank
</route>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-col class="bg-primary">
        <div class="d-flex fill-height justify-center align-center ma-6">
          <v-img
            src="@/assets/MV Core - LOGO COM SLOGAN - COLOR E BRANCO.png"
            max-width="70%"
            alt="Logotipo do sistema MVCore"
          ></v-img>
        </div>
      </v-col>

      <v-col cols="12" md="5" class="d-flex align-center justify-center bg-lightbackground">
        <v-sheet width="100%" max-width="450" class="pa-8 ma-4 bg-secondary text-primary" rounded="lg" elevation="3">
          <h1 class="text-h4 font-weight-bold mb-10">Acesso</h1>

          <v-form @submit.prevent="handleLogin">
            <v-alert
              v-if="showAlert"
              :type="alertType"
              density="compact"
              class="mb-8 text-caption"
              variant="tonal"
              :text="alertMessage"
            ></v-alert>

            <v-text-field
              label="E-mail"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              class="mb-2"
              v-model="email"
              density="comfortable"
              :error="showFieldError"
            ></v-text-field>

            <v-text-field
              label="Senha"
              variant="outlined"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              v-model="password"
              density="comfortable"
              :error="showFieldError"
            ></v-text-field>

            <div class="mt-4 text-end">
              <a href="#" class="text-blue text-body-2" @click.prevent="openRecuperarSenha">
                Esqueceu a senha?
              </a>
            </div>
            <RecoverPasswordModal
              v-if="showRecuperarSenha"
              v-model="showRecuperarSenha"
              :email="email"
              ref="recuperarSenhaModal"
              @success="handleRecoverySuccess"
            />

            <v-btn 
              block 
              color="primary" 
              size="large" 
              class="mt-10"
              type="submit"
              :loading="loading"
            >
              Entrar
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';
import { useAlertStore } from '@/stores/alertStore'
import RecoverPasswordModal from '@/components/modal/RecoverPasswordModal.vue';

const router = useRouter();

const alertStore = useAlertStore()
const alertStoreMessage = computed(() => alertStore.message)

const email = ref('');
const password = ref('');
const loading = ref(false);

const alertType = ref<'error' | 'success' | 'info' | 'warning'>('error');
const alertMessage = ref<string | undefined>();
const showAlert = ref(false);
const showFieldError = ref(false);

const recuperarSenhaModal = ref();
const showRecuperarSenha = ref(false);

if (alertStoreMessage.value) {
  clearAlert();
  alertMessage.value = 'Sua sessão expirou. Por favor, acesse novamente.';
  alertType.value = 'error';
  showAlert.value = true;
}

const openRecuperarSenha = () => {
  showRecuperarSenha.value = true;
};

function handleRecoverySuccess(email: string) {
  clearAlert();
  alertType.value = 'success';
  showAlert.value = true;
  alertMessage.value = 'Verifique seu e-mail, enviamos um link para que você possa redefinir sua senha com segurança.';
  showRecuperarSenha.value = false;
}

const handleLogin = async () => {
  clearAlert()
  loading.value = true;

  try {
    const result = await authService.login({
      email: email.value,
      password: password.value,
    });

    if (result) {
      router.push('/financeiro')
    } else {
      showAlert.value = true;
      showFieldError.value = true;
      alertType.value = 'error';
      alertMessage.value = 'Não localizamos uma conta com essas credenciais. Verifique os dados informados e tente novamente.';
    }
  } finally {
    loading.value = false;
  }
};

function clearAlert() {
    alertStore.clearMessage()
    showAlert.value = false;
    showFieldError.value = false;
    alertMessage.value = '';
  }
</script>