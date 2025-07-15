import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import type { FormField } from "@/type/index"

export const editFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'current_password',
    props: { label: 'Senha antiga', variant: 'outlined', maxlength: 30},
    
  },
];