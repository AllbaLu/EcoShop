<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/api'
import { products as staticProducts } from '@/data/products'

const products = ref([])
const currentSlide = ref(0)
const loading = ref(false)

// Cargar productos desde el catálogo (combinar estáticos con BD)
async function loadProducts() {
  loading.value = true
  try {
    const response = await api.get('/products')
    const productsFromDB = response.data || []
    
    // Combinar productos estáticos con los de BD
    const allProducts = [...staticProducts.value, ...productsFromDB]
    
    // Tomar los primeros 12 productos
    products.value = allProducts.slice(0, 12)
    
    console.log('Productos cargados en carrusel:', products.value.length)
  } catch (err) {
    console.error('Error al cargar productos para el carrusel:', err)
    // Usar solo productos estáticos si hay error
    products.value = staticProducts.value.slice(0, 12)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})

const maxSlides = computed(() => Math.max(0, Math.ceil(products.value.length / 4) - 1))

function nextSlide() {
  if (currentSlide.value < maxSlides.value) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}
</script>

<template>
  <v-container class="my-8">
    <v-row>
      <v-col cols="12">
        <div class="carousel-container position-relative">
          <!-- Botón Anterior -->
          <v-btn
            icon
            size="large"
            color="primary"
            class="carousel-btn carousel-btn-prev"
            @click="prevSlide"
            :disabled="currentSlide === 0"
            elevation="2"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <!-- Productos Carousel -->
          <div class="carousel-wrapper">
            <v-sheet v-if="loading" class="text-center pa-8">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
              <p class="mt-2">Cargando productos...</p>
            </v-sheet>
            
            <v-sheet v-else class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div 
                v-for="product in products"
                :key="product.id"
                class="carousel-item"
              >
                <v-card flat class="product-card cursor-pointer h-100 mx-2">
                  <v-sheet
                    color="grey-lighten-4"
                    height="220"
                    class="d-flex align-center justify-center mb-3 rounded-lg position-relative"
                  >
                    <!-- Si la imagen es un icono MDI -->
                    <v-icon v-if="product.image?.startsWith('mdi-')" :icon="product.image" size="60" color="grey-lighten-1"></v-icon>
                    <!-- Si es una URL de imagen -->
                    <v-img v-else :src="product.image" cover height="220"></v-img>
                    
                    <v-btn 
                      icon="mdi-heart-outline" 
                      variant="text" 
                      size="small" 
                      class="position-absolute top-0 right-0 ma-2"
                    ></v-btn>
                  </v-sheet>

                  <div class="px-2 pb-3">
                    <div class="text-body-2 font-weight-medium text-truncate mb-1">
                      {{ product.name }}
                    </div>
                    
                    <div class="d-flex justify-space-between align-center">
                      <span class="text-h6 font-weight-bold text-primary">
                        ${{ product.price.toFixed(0) }}
                      </span>
                      
                      <div class="d-flex align-center">
                        <v-icon 
                          v-for="(badgeColor, i) in product.ecoBadges" 
                          :key="i" 
                          icon="mdi-circle" 
                          size="x-small" 
                          :color="badgeColor"
                          class="ml-1"
                        ></v-icon>
                      </div>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-sheet>
          </div>

          <!-- Botón Siguiente -->
          <v-btn
            icon
            size="large"
            color="primary"
            class="carousel-btn carousel-btn-next"
            @click="nextSlide"
            :disabled="currentSlide >= Math.ceil(products.length / 4) - 1"
            elevation="2"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>

        <!-- Indicadores -->
        <div class="text-center mt-6">
          <v-btn
            v-for="n in Math.ceil(products.length / 4)"
            :key="n"
            icon
            size="x-small"
            :color="currentSlide === n - 1 ? 'primary' : 'grey'"
            @click="currentSlide = n - 1"
            class="mx-1"
          >
            <v-icon size="8">mdi-circle</v-icon>
          </v-btn>
        </div>

        <!-- Botón Ver Todos -->
        <div class="text-center mt-8">
          <v-btn 
            variant="outlined" 
            rounded="pill" 
            color="primary"
            size="large"
            to="/product-section"
          >
            Ver todos los productos
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-wrapper {
  overflow: hidden;
  padding: 0 60px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.carousel-item {
  min-width: 25%;
  flex-shrink: 0;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.carousel-btn-prev {
  left: 0;
}

.carousel-btn-next {
  right: 0;
}

.product-card:hover .v-sheet {
  background-color: #E6EB51 !important;
  transition: background-color 0.3s ease;
}

.product-card:hover .v-icon {
  color: #375A0A !important;
}

.cursor-pointer {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1280px) {
  .carousel-item {
    min-width: 33.333%;
  }
}

@media (max-width: 960px) {
  .carousel-item {
    min-width: 50%;
  }
}

@media (max-width: 600px) {
  .carousel-item {
    min-width: 100%;
  }
  
  .carousel-wrapper {
    padding: 0 50px;
  }
}
</style>
