import dayjs from 'dayjs';
import type { Tenant } from '@/type';


export function useFormatters() {
  
    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      };
  
    const formatDate = (data: string | Date | null | undefined): string => {
      if (!data) return 'Data indisponível';
      const dataObj = new Date(data);
      if (isNaN(dataObj.getTime())) {
        return 'Data inválida';
      }
      return dayjs(dataObj).format('DD/MM/YYYY HH:mm');
    };

    const formatPercent = (value: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    };

    const getTenantDisplayName = (tenant: Partial<Tenant> | null | undefined): string => {
      if (!tenant) {
        return 'Não identificado';
      }
      return tenant.nome_fantasia || tenant.razao_social || tenant.documento || 'Não identificado';
    };
  
    return {
      formatCurrency,
      formatDate,
      formatPercent,
      getTenantDisplayName,
    };
  }