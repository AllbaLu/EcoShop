// 1. Siempre crear el router en un archivo separado
import { createRouter, createWebHistory } from 'vue-router'

// 2. Importar las vistas que se usarán en las rutas
import BlogView from '@/views/BlogView.vue'
import HomeView from '@/views/HomeView.vue'
import SellosView from '@/views/SellosView.vue'
import ProductSectionView from '@/views/ProductSectionView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'

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
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetailView
    }
  ],
})

export default router