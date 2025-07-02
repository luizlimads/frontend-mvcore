import { markRaw } from 'vue';
import { VTextField, VSelect } from 'vuetify/components';
import type { FormField } from "@/type/index"

export const baseFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'nome',
    props: { label: 'Nome*', variant: 'outlined', maxlength: 255 },
  },
  {
    component: markRaw(VTextField),
    key: 'email',
    props: { label: 'E-mail*', variant: 'outlined', maxlength: 255 },
  },
  {
    component: markRaw(VTextField),
    key: 'password',
    props: { label: 'Senha*', variant: 'outlined', maxlength: 15 },
  },
  {
    component: markRaw(VSelect),
    key: 'tenant',
    props: {
      label: 'Parceiro*',
      variant: 'outlined',
      itemTitle: 'nome_fantasia',
      itemValue: 'id',
    },
  },
];