// 1. Siempre crear el router en un archivo separado
import { createRouter, createWebHistory } from 'vue-router'

// 2. Importar las vistas que se usarán en las rutas
import BlogView from '@/views/BlogView.vue'
import HomeView from '@/views/HomeView.vue'
import SellosView from '@/views/SellosView.vue'
import ProductSectionView from '@/views/ProductSectionView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import PanelAdminView from '@/views/PanelAdminView.vue'
import { useAuthStore } from '@/stores/auth'
import ContactView from '@/views/ContactView.vue'

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
    {
      path: '/product-section',
      name: 'productsectionview',
      component: ProductSectionView,
    },
    {
      path: '/blogdetail/:id',
      name: 'blogdetailview',
      component: () => import('@/views/BlogDetailView.vue'),
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetailView
    },  
    {
      path: '/paneladmin',
      name: 'PanelAdminView',
      component: () => import('@/views/PanelAdminView.vue')
    },
    {
      path: '/contacto',
      name: 'contactoview',
      component: ContactView
    }
  ],
})

// Protect admin route: require valid token + admin role
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.name === 'PanelAdminView') {
    const hasToken = !!auth.token
    const isAdmin = auth.user && auth.user.role === 'admin'
    if (!hasToken || !isAdmin) {
      return next({ name: 'homeview' })
    }
  }
  next()
})

export default router