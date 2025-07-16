import { markRaw } from 'vue';
import { VTextField, VSelect } from 'vuetify/components';
import { requiredRule ,emailRule } from "@/validators"
import type { FormField } from "@/type/index"


export const createFields: FormField[] = [
  {
    component: markRaw(VSelect),
    key: 'tenant',
    props: {
      label: 'Cliente*',
      variant: 'outlined',
      itemTitle: 'nome_fantasia',
      itemValue: 'id',
    },
    rules:[requiredRule],
  },
  {
    component: markRaw(VTextField),
    key: 'password',
    props: { label: 'Senha', variant: 'outlined', maxlength: 30, readonly:true},
    
  },
];