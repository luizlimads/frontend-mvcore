import { markRaw } from 'vue';
import { VTextField, VSelect } from 'vuetify/components';
import type { FormField } from "@/type/index"
import { requiredRule } from "@/validators"

export const baseFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'nome_fantasia',
    props: { label: 'Nome Fantasia*', variant: 'outlined', maxlength: 255 },
    rules: [requiredRule]
  },
  {
    component: markRaw(VTextField),
    key: 'razao_social',
    props: { label: 'Razão Social*', variant: 'outlined', maxlength: 255 },
    rules: [requiredRule]
  },
  {
    component: markRaw(VTextField),
    key: 'documento',
    props: { label: 'Documento*', variant: 'outlined', maxlength: 15 },
    rules: [requiredRule]
  },
  {
    component: markRaw(VSelect),
    key: 'sistema_integrado',
    props: {
      label: 'Sistema Integrado*',
      variant: 'outlined',
      itemTitle: 'nome',
      itemValue: 'id',
    },
    rules: [requiredRule]
  },
];