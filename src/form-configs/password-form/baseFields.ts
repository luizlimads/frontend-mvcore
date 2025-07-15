import { markRaw } from 'vue';
import { VTextField } from 'vuetify/components';
import { requiredRule, hasNumberRule, hasLetterRule, minLengthRule } from "@/validators"
import type { FormField } from "@/type/index"

export const baseFields: FormField[] = [
  {
    component: markRaw(VTextField),
    key: 'new_password',
    props: { label: 'Nova senha*', variant: 'outlined', maxlength: 255, type:'password'},
    rules:[requiredRule, hasNumberRule, hasLetterRule, minLengthRule(6)],
  },
  {
    component: markRaw(VTextField),
    key: 're_new_password',
    props: { label: 'Repita a nova senha*', variant: 'outlined', maxlength: 255, type:'password'},
    rules:[requiredRule, ],
  },];