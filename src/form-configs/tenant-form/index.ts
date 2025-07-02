import type { FormField } from '@/type/index';
import { baseFields as bFields } from './baseFields';
import { ssoticaFields } from './ssoticaFields';

// Mapa de campos específicos por nome do sistema
const systemSpecificFields: Record<string, FormField[]> = {
  ssotica: ssoticaFields,
  // Adicione novos sistemas aqui
};

export const baseFields = bFields;
export { systemSpecificFields };