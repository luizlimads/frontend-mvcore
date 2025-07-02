export function useFormatters() {
  
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      };
  
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString('pt-BR');
    };
  
    return {
      formatCurrency,
      formatDate,
    };
  }