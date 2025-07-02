<template>
    <v-card :id="cardId" class="pa-3" elevation="4" rounded="xl">
      <div class="d-flex justify-space-between align-start">
        <div>
          <p class="text-subtitle-2 font-weight-medium">{{ title }}</p>
          <h4 class="text-h5 font-weight-bold mb-2">{{ value }}</h4>
        </div>
        <span v-if="secondaryText" class="text-caption text-grey-lighten-1">
          {{ secondaryText }}
        </span>
      </div>
      
      <apexchart
        type="line"
        height="50"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </v-card>
  </template>
  
<script lang="ts" setup>
    interface Props {
        title: string;
        value: string;
        cardId: string;
        chartOptions: object;
        series: any[];
        secondaryText?: string; // O '?' indica que esta prop é opcional.
    }
  
    defineProps<Props>();
</script>
  
<style scoped>
    .v-card {
        color: white;
    }
    #saldo-card, #entradas-card, #despesas-card {
        background-color: #2a2a3e; /* Ajuste a cor conforme seu tema */
    }
</style>