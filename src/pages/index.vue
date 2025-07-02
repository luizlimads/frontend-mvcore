<route lang="yaml">
  meta:
    layout: blank
</route>

<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      <v-col md="7"  style="background-color: #172c41">
        <div class="d-flex fill-height justify-center align-center ma-6">
          <v-img
            src="@/assets/MV Core - LOGO COM SLOGAN - CINZA E AMARELO.png"
            max-width="70%"
            alt="Logotipo do sistema MVCore"
          ></v-img>
        </div>
      </v-col>

      <v-col cols="12" md="5" class="d-flex align-center justify-center" style="background-color: white">
        <v-sheet width="100%" max-width="450" class="pa-8 ma-4" rounded="lg" elevation="0" style="background-color: white; color: #22415e;">
          <h1 class="text-h4 font-weight-bold mb-12">Acesso</h1>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              label="E-mail"
              variant="outlined"
              prepend-inner-icon="mdi-email-outline"
              class="mb-2"
              v-model="email" 
            ></v-text-field>

            <v-text-field
              label="Senha"
              variant="outlined"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              v-model="password" 
            ></v-text-field>

            <div class="d-flex justify-space-between align-center mt-2">
              <a href="#" class="text-body-2 text-blue">Esqueceu a senha?</a>
            </div>

            <v-alert
              v-if="error"
              type="error"
              density="compact"
              class="mt-8"
              variant="tonal"
            >
              {{ error }}
            </v-alert>

            <v-btn 
              block 
              color="#22415e" 
              size="large" 
              class="mt-8"
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
// Certifique-se de que o caminho para o seu apiService está correto
import { apiService } from '@/services/apiService';

const router = useRouter();

// Variáveis reativas que serão conectadas ao template
const email = ref('ssotica@ssotica.com'); // Valor inicial para teste
const password = ref('ssotica');      // Valor inicial para teste
const loading = ref(false);
const error = ref<string | null>(null);

/**
* Esta é a função que é disparada pelo evento do formulário.
* Ela chama o serviço de API para fazer o POST e salvar o JWT.
*/
const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    // 1. Dispara a função de POST para o login
    // 2. O próprio apiService.login já salva o token no localStorage
    await apiService.login({
      // Usamos .value para obter o valor das variáveis reativas
      email: email.value,
      password: password.value,
    });
    // 3. Redireciona para a página principal após o sucesso
    router.push('/financeiro');
  } catch (e) {
    // Em caso de erro, define a mensagem de erro que será exibida no v-alert
    error.value = 'Falha na autenticação. Verifique suas credenciais.';
    console.error(e); // Também é bom logar o erro real no console para depuração
  } finally {
    // Garante que o estado de 'loading' seja desativado ao final
    loading.value = false;
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>