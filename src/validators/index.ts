export const requiredRule = (value: any): boolean | string => {
    return !!value || 'Este campo é obrigatório.';
  };
  
export const emailRule = (value: string): boolean | string => {
  if (!value) return true; // A regra 'required' cuida dos casos vazios
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value) || 'O e-mail informado não é válido.';
};
  
export const minLengthRule = (min: number) => {
  return (value: string): boolean | string => {
    if (!value) return true; // A regra 'required' cuida dos casos vazios
    return value.length >= min || `Este campo deve ter no mínimo ${min} caracteres.`;
  };
};

export const confirmationRule = (originalValue: string, message: string) => {
  return (value: string): boolean | string => {
    return value === originalValue || message;
  };
};

export const hasNumberRule = (value: string): boolean | string => {
  if (!value) return true;
  return /\d/.test(value) || 'Deve conter ao menos um número.';
};

export const hasLetterRule = (value: string): boolean | string => {
  if (!value) return true;
  return /[a-zA-Z]/.test(value) || 'Deve conter ao menos uma letra.';
};