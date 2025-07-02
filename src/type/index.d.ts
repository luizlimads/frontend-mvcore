import type { Component } from 'vue';
import type { VTextField } from 'vuetify/components';

type VTextFieldVariant = 'outlined' | 'plain' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled';

export interface FieldProps {
  label: string;
  variant: VTextFieldVariant;
  items?: any[];
  itemTitle?: string;
  itemValue?: string;
  maxlength?: number;
  counter?: boolean;
  type?: string;
}

export interface FormField {
  component: Component;
  key: string;
  props: FieldProps;
  rules?: any[];
}

export interface FormConfig {
  title: string;
  fields: FormField[];
}

export interface Erp {
  id: number | string;
  nome: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface Item {
  id: number;
  name: string;
  species: string;
  diet: string;
  habitat: string;
}

export interface Lancamento {
  id: string
  id_origem: string
  data_competencia: string
  data_lancamento: string
  valor: number
  tipo: string
  descricao: string
  venda: string
  conta: string
  categoria: string
  fornecedor: string
  data_criacao: string
}

export interface Erps {
  id: string
  nome: string
  data_criacao: string
}

export interface Tenants {
  id: string | null
  documento: string
  razao_social: string
  nome_fantasia: string
  sistema_integrado: string
  documento_api: string
  codigo_api: string | null
  token_api: string | null
  data_criacao: string | null
}


interface AuthResponse {
  access: string; 
  refresh: string; 
  // ...outras propriedades que sua API de login retorna
}