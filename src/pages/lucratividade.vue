// src/pages/dashboard.vue
<template>
  <v-container fluid>
    <h1 class="text-h5 font-weight-bold mb-4">Dashboard</h1>

    <!-- Métricas -->
    <v-row class="mb-6" dense>
      <v-col cols="12" md="3" v-for="(metric, i) in metrics" :key="i">
        <v-card class="pa-4 d-flex align-center" elevation="2">
          <v-avatar color="primary" class="me-4">
            <v-icon dark>{{ metric.icon }}</v-icon>
          </v-avatar>
          <div>
            <div class="text-h6">{{ metric.value }}</div>
            <div class="text-caption">{{ metric.label }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gráficos e Tabelas -->
    <v-row dense>
      <v-col cols="12" md="8">
        <v-card class="pa-4 mb-4" elevation="2">
          <h2 class="text-subtitle-1 mb-2">Sales</h2>
          <apexchart
            height="250"
            type="line"
            :options="salesChartOptions"
            :series="salesChartData"
          />
        </v-card>

        <v-card class="pa-4" elevation="2">
          <h2 class="text-subtitle-1 mb-2">Recent Orders</h2>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.customer }}</td>
                <td>{{ order.date }}</td>
                <td>
                  <v-chip
                    :color="statusColors[order.status]"
                    size="small"
                    label
                    dark
                  >
                    {{ order.status }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4 mb-4" elevation="2">
          <h2 class="text-subtitle-1 mb-2">Top Products</h2>
          <v-list density="compact">
            <v-list-item v-for="(product, i) in topProducts" :key="i">
              <v-list-item-title>{{ product.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ product.sales }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const metrics = [
  { icon: 'mdi-cart', label: 'Total Orders', value: 10 },
  { icon: 'mdi-currency-usd', label: 'Revenue', value: 'R$ 5.300' },
  { icon: 'mdi-account', label: 'Customers', value: 1280 },
  { icon: 'mdi-trending-up', label: 'Sales Trend', value: '+125%' }
]

const salesChartOptions = {
  chart: { id: 'sales-line' },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  stroke: { curve: 'smooth' },
  colors: ['#1E88E5']
}

const salesChartData = [
  { name: 'Sales', data: [10, 20, 15, 25, 35] }
]

const orders = [
  { id: '#12347', customer: 'Maria Sousa', date: '04/04/2024', status: 'Shipped' },
  { id: '#12346', customer: 'João Silva', date: '03/04/2024', status: 'Pending' },
  { id: '#12345', customer: 'Ana Oliveira', date: '02/04/2024', status: 'Delivered' },
  { id: '#12344', customer: 'Carlos Mendes', date: '01/04/2024', status: 'Cancelled' }
]

const statusColors: Record<string, string> = {
  Shipped: 'blue',
  Pending: 'orange',
  Delivered: 'green',
  Cancelled: 'red'
}

const topProducts = [
  { name: 'Product A', sales: 320 },
  { name: 'Product B', sales: 280 },
  { name: 'Product C', sales: 230 },
  { name: 'Product D', sales: 180 }
]
</script>

<style scoped>
.v-table {
  width: 100%;
}
</style>
