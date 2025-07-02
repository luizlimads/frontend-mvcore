import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import type { FormField } from '@/type/index';

export const ssoticaFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'documento_api',
    props: { label: 'Documento API', variant: 'outlined', maxlength: 50 },
  },
  {
    component: markRaw(VTextField),
    key: 'codigo_api',
    props: { label: 'Usuário API', variant: 'outlined', maxlength: 50 },
  },
  {
    component: markRaw(VTextField),
    key: 'token_api',
    props: { label: 'Token API', variant: 'outlined', maxlength: 50 },
  },
];