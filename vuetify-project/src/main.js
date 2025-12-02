/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Card_blog from './components/BlogPost.vue'
import { router } from '@/router'


// Styles
import 'unfonts.css'
import 'vuetify/styles'
import '@/style.css'

const app = createApp(App)

registerPlugins(app)
app.use(vuetify)
app.component('Card_blog', Card_blog)

app.mount('#app')



//PROBANDO 
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