
export const SYSTEM_MESSAGES = {
    SUCCESS: {
        CREATE_USER: 'O usuário foi incluído no sistema.',
        UPDATE_USER: 'As informações do usuário foram atualizadas.',
        DELETE_USER: 'O usuário foi removido do sistema.',
        UPDATE_PASSWORD: 'Sua senha foi atualizada.',
    
        CREATE_TENANT: 'O cliente foi incluído no sistema.',
        UPDATE_TENANT: 'As informações do cliente foram atualizadas.',
        DELETE_TENANT: 'O cliente foi removido do sistema.',

        OPERATION: 'A operação foi concluída.',
    },
  
    ERROR: {
        GENERAL: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.',
        SERVER_UNAVAILABLE: 'Não foi possível conectar com o servidor. Verifique sua conexão.',
        PAGE_NOT_FOUND: 'A página solicitada não existe, você foi redirecionado.',
    },
  
    CONFIRMATION: {
        DELETE: (itemName: string) => `Você tem certeza que deseja excluir "${itemName}"? Esta ação não pode ser desfeita.`,
    },
  
    VALIDATION: {
        REQUIRED_FIELD: 'Este campo é obrigatório.',
        INVALID_EMAIL: 'O e-mail informado não é válido.',
    },
  };