import type { Component } from 'vue'
import type { VTextField } from 'vuetify/components'

type VTextFieldVariant = 'outlined' | 'plain' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'

export interface FieldProps {
  [key: string]: any;

  variant: VTextFieldVariant
  label: string
  items?: any[]
  itemTitle?: string
  itemValue?: string
  maxlength?: number
  type?: string
  counter?: boolean
  readonly?: boolean
  label: string;
  appendInnerIcon?: string
}

export interface FormField {
  component: Component
  key: string
  props: FieldProps
  rules?: any[]
}

export interface FormConfig {
  title: string
  fields: FormField[]
}


export interface ApiResponse<T> {
  data: T
  status: number
}

export interface Item {
  id: number
  name: string
  species: string
  diet: string
  habitat: string
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

export interface Erp {
  id?: string
  nome: string
  data_criacao?: string
}

export interface Tenant {
  documento: string
  razao_social: string
  nome_fantasia: string
  sistema_integrado: string
  id?: string
  documento_api?: string
  codigo_api?: string
  token_api?: string
  data_criacao?: string
}

export interface User {
  nome: string
  email: string
  tenant: Tenant
  id?: string
  password?: string
  is_active?: boolean
  last_login?: string
  is_superuser?:boolean
}

interface AuthResponse {
  access: string 
  refresh: string 
}

interface SetPassword {
  current_password : string
  new_password: string
  re_new_password: string
}