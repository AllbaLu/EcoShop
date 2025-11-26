/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const ecoTheme = {
  dark: false,
  colors: {
    background: '#F1FFFF', // El azul muy pálido (Fondo general)
    surface: '#FFFFFF',    // Blanco puro para las tarjetas
    primary: '#375A0A',    // Verde Bosque (Botones principales, Headers)
    secondary: '#C8E8FF',  // Azul Cielo (Botones secundarios, iconos)
    accent: '#E6EB51',     // Lima (Ofertas, Badges, Call to Action vibrante)
    info: '#010101',       // Negro (Texto)
  }
}

// Composables
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'ecoTheme',
        themes: {
        ecoTheme,
  }},
})
