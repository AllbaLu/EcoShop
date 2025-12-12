<script setup>
import { ref, onMounted, onActivated, computed } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router' // Para navegar y refrescar en visitas
import api from '@/api'
import { products as staticProducts } from '@/data/products'

// STORES
import { useCartStore } from '@/stores/useCartStore'
import { useFilterStore } from '@/stores/useFilterStore'

const cart = useCartStore()
const filterStore = useFilterStore()
const router = useRouter()

const products = ref([])
const currentSlide = ref(0)
const loading = ref(false)

// ... (Tu función loadProducts sigue IGUAL) ...
function shuffle(arr) {
  // Fisher–Yates
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

async function loadProducts() {
  loading.value = true
  try {
    // Usamos el endpoint real disponible
    const response = await api.get('/products')
    const productsFromDB = Array.isArray(response.data) ? response.data : []
    const mixed = shuffle([...staticProducts.value, ...productsFromDB])
    products.value = mixed.slice(0, 8) // Máximo 8 destacados
  } catch (err) {
    console.error(err)
    products.value = shuffle(staticProducts.value).slice(0, 8)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})

// Refrescar en cada visita/activación del componente
onActivated(() => {
  loadProducts()
})

// Si la ruta cambia a la misma vista, recarga
onBeforeRouteUpdate((_to, _from, next) => {
  loadProducts()
  next()
})

const maxSlides = computed(() => Math.max(0, Math.ceil(products.value.length / 4) - 1))

function nextSlide() {
  if (currentSlide.value < maxSlides.value) currentSlide.value++
}

function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--
}

// Añadir al carrito
const addToCart = (product) => {
  cart.addItem(product)
}

// Ver detalle (Navegar a ProductSection y abrir modal)
const goToDetail = (product) => {
  filterStore.productToOpen = product
  router.push('/product-section')
}
</script>

<template>
  <v-container class="my-8">
    <v-row>
      <v-col cols="12">
        
        <div class="carousel-container position-relative">
          <v-btn icon size="large" color="primary" class="carousel-btn carousel-btn-prev" @click="prevSlide" :disabled="currentSlide === 0" elevation="2">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <div class="carousel-wrapper">
            <v-sheet v-if="loading" class="text-center pa-8">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-sheet>
            
            <v-sheet v-else class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="product in products" :key="product.id" class="carousel-item">
                
                <v-card 
                  flat 
                  class="product-card cursor-pointer h-100 mx-2 d-flex flex-column"
                  @click="goToDetail(product)" 
                >
                  <v-sheet color="grey-lighten-4" height="220" class="d-flex align-center justify-center mb-3 rounded-lg position-relative">
                    <v-icon v-if="product.image?.startsWith('mdi-')" :icon="product.image" size="60" color="grey-lighten-1"></v-icon>
                    <v-img v-else :src="product.image" cover height="220"></v-img>
                    
                    <v-btn icon="mdi-heart-outline" variant="text" size="small" class="position-absolute top-0 right-0 ma-2"></v-btn>
                  </v-sheet>

                  <div class="px-2 pb-3 flex-grow-1">
                    <div class="text-body-2 font-weight-medium text-truncate mb-1">{{ product.name }}</div>
                    <div class="d-flex justify-space-between align-center">
                      <span class="text-h6 font-weight-bold text-primary">${{ product.price.toFixed(0) }}</span>
                      <div class="d-flex align-center">
                        <v-icon v-for="(badgeColor, i) in product.ecoBadges" :key="i" icon="mdi-circle" size="x-small" :color="badgeColor" class="ml-1"></v-icon>
                      </div>
                    </div>
                  </div>

                  <v-btn 
                    block 
                    variant="tonal" 
                    color="forest" 
                    size="small" 
                    class="mt-2 text-none"
                    @click.stop="addToCart(product)"
                  >
                    <v-icon start icon="mdi-cart-plus"></v-icon> Añadir
                  </v-btn>

                </v-card>
              </div>
            </v-sheet>
          </div>

          <v-btn icon size="large" color="primary" class="carousel-btn carousel-btn-next" @click="nextSlide" :disabled="currentSlide >= maxSlides" elevation="2">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>

        <div class="text-center mt-6">
          <v-btn v-for="n in Math.ceil(products.length / 4)" :key="n" icon size="x-small" :color="currentSlide === n - 1 ? 'primary' : 'grey'" @click="currentSlide = n - 1" class="mx-1">
            <v-icon size="8">mdi-circle</v-icon>
          </v-btn>
        </div>
        <div class="text-center mt-8">
          <v-btn variant="outlined" rounded="pill" color="primary" size="large" to="/product">Ver todos los productos</v-btn>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Tus estilos se mantienen igual */
.carousel-container { position: relative; overflow: hidden; }
.carousel-wrapper { overflow: hidden; padding: 0 60px; }
.carousel-track { display: flex; transition: transform 0.5s ease; width: 100%; }
.carousel-item { min-width: 25%; flex-shrink: 0; }
.carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; }
.carousel-btn-prev { left: 0; }
.carousel-btn-next { right: 0; }
.product-card:hover .v-sheet { background-color: #E6EB51 !important; transition: background-color 0.3s ease; }
.product-card:hover .v-icon { color: #375A0A !important; }
.cursor-pointer { cursor: pointer; }
.text-forest { color: #375A0A !important; }

@media (max-width: 1280px) { .carousel-item { min-width: 33.333%; } }
@media (max-width: 960px) { .carousel-item { min-width: 50%; } }
@media (max-width: 600px) { .carousel-item { min-width: 100%; } .carousel-wrapper { padding: 0 50px; } }
</style>