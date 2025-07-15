import { defineStore } from 'pinia';
import { ref } from 'vue';

type SnackbarColor = 'success' | 'error' | 'warning' | 'info'

export const useSnackbarStore = defineStore('snackbar', () => {
  const show = ref(false);
  const text = ref('');
  const color = ref<SnackbarColor>('success');

  function showSnackbar(message: string, newColor: SnackbarColor = 'success') {
    text.value = message;
    color.value = newColor;
    show.value = true;
  }

  return { show, text, color, showSnackbar };
});