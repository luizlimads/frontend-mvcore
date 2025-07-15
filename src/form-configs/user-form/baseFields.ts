import { markRaw } from 'vue';
import { VTextField, VSelect } from 'vuetify/components';
import { requiredRule ,emailRule } from "@/validators"
import type { FormField } from "@/type/index"


export const baseFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'nome',
    props: { label: 'Nome completo*', variant: 'outlined', maxlength: 255 },
    rules:[requiredRule],
  },
  // {
  //   component: markRaw(VTextField),
  //   key: 'email',
  //   props: { label: 'E-mail*', variant: 'outlined', maxlength: 255},
  //   rules:[requiredRule, emailRule],
  // },
];