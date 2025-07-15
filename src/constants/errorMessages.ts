/**
 * Mapeia mensagens de erro técnicas da API para mensagens amigáveis ao usuário.
 * A chave é a mensagem exata (ou parte dela) vinda do backend.
 * O valor é a mensagem que será exibida no frontend.
*/
export const API_ERROR_MAP: Record<string, string> = {
    "tenant com este documento já existe.": "Já existe um parceiro com este documento (CNPJ/CPF).",
    "Senha inválida.": "Sua senha atual não confere",
  
  };

export const DEFAULT_ERROR_MESSAGE = 'Ocorreu um erro ao processar sua solicitação. Verifique os dados e tente novamente.';