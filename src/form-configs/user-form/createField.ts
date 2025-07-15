import { markRaw } from 'vue';
import { VTextField, VSelect } from 'vuetify/components';
import { requiredRule ,emailRule, noLeadingTrailingSpaceRule } from "@/validators"
import type { FormField } from "@/type/index"


export const createFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'email',
    props: { label: 'E-mail*', variant: 'outlined', maxlength: 255},
    rules:[requiredRule, noLeadingTrailingSpaceRule, emailRule],
  }
  ,{
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
    props: { label: 'Senha', variant: 'outlined', maxlength: 30},
    
  },
];