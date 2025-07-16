/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'mvcoreTheme',
    themes: {
      mvcoreTheme: {
        dark: false,
        colors: {
          // Paleta principal
          primary: '#172C41',
          secondary: '#F5F5F5',

          // Semânticas
          success: '#1B5E20',
          error: '#B71C1C',
          warning: '#FFB300',
          info: '#0D47A1',

          // Personalizadas (usadas por nome)
          background: '#22415E',
          lightbackground: '#CFD8DC',
          chart01: '#0277BD',
          chart02: '#BA68C8',
          chart03: '#4DB6AC',
          chart04: '#7E57C2',
          chart05: '#66BB6A',
        }
      }
    }
  },
})