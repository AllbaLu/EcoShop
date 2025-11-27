// 1. Siempre crear el router en un archivo separado
import { createRouter, createWebHistory } from 'vue-router'

// 2. Importar las vistas que se usarán en las rutas
import BlogView from '@/views/BlogView.vue'
import HomeView from '@/views/HomeView.vue'
import SellosView from '@/views/SellosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeview',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'blogview',
      component: BlogView,
    },
    {
      path: '/sellos',
      name: 'sellosview',
      component: SellosView,
    },
  ],
})

// 3. Exportar el router para usarlo en main.js
export { router }
export default router
