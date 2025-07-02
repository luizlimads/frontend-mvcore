import type { FormField } from '@/type/index';
import { baseFields as bFields } from './baseFields';

// Mapa de campos específicos por nome do sistema
const systemSpecificFields: Record<string, FormField[]> = {
  // Adicione novos sistemas aqui
};

export const baseFields = bFields;
export { systemSpecificFields };