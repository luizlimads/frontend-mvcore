import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import type { FormField } from '@/type/index';
import { requiredRule } from "@/validators"


export const ssoticaFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'documento_api',
    props: { label: 'Documento API', variant: 'outlined', maxlength: 50 },
    rules: [requiredRule],

  },
  {
    component: markRaw(VTextField),
    key: 'codigo_api',
    props: { label: 'Usuário API', variant: 'outlined', maxlength: 50 },
    rules: [requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'token_api',
    props: { label: 'Token API', variant: 'outlined', maxlength: 50 },
    rules: [requiredRule],
  },
];