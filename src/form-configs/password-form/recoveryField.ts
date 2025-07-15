import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import type { FormField } from "@/type/index"

export const recoveryFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'code',
    props: { label: 'senhaCode', variant: 'outlined', maxlength: 30},
    
  },
];