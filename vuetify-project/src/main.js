/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

//Manejo de estado global
import { createPinia } from 'pinia'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Card_blog from './components/BlogPost.vue'


// Styles
import 'unfonts.css'
import 'vuetify/styles'
import '@/style.css'



const app = createApp(App)

// Integrate Pinia
app.use(createPinia())

registerPlugins(app)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)
registerPlugins(app)

app.component('Card_blog', Card_blog)
app.mount('#app')



