<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    title: "Cepillo de dientes de bambú",
    price: 20,
    rating: 3.5,
    image: "mdi-toothbrush",
    ecoBadge: ["#375A0A", "#E6E851"]
  },
  { 
    id: 2, 
    title: "Camiseta de Algodón Orgánico",
    price: 25.00, 
    rating: 5,
    image: "mdi-tshirt-crew", 
    ecoBadge: ['#375A0A'] 
  },
  { 
    id: 3, 
    title: "Botella de Vidrio Reciclado", 
    price: 18.00, 
    rating: 4,
    image: "mdi-bottle-wine", 
    ecoBadge: [] 
  },
  { 
    id: 4, 
    title: "Cuaderno Ecológico", 
    price: 15.00, 
    rating: 4.8,
    image: 'mdi-notebook', 
    ecoBadge: ['#375A0A'] 
  },
  { 
    id: 5, 
    title: "Batería Solar", 
    price: 45.00, 
    rating: 4.2,
    image: 'mdi-battery-charging', 
    ecoBadge: ['#E6EB51'] 
  },
  { 
    id: 6, 
    title: "Mochila de Cáñamo", 
    price: 60.00, 
    rating: 4.9,
    image: "mdi-bag-personal", 
    ecoBadge: ['#375A0A', '#010101'] 
  }
])

const currentSlide = ref(0)

function nextSlide() {
  if (currentSlide.value < Math.ceil(products.value.length / 4) - 1) {
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
            <v-sheet class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
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
                    <v-icon :icon="product.image" size="60" color="grey-lighten-1"></v-icon>
                    <v-btn 
                      icon="mdi-heart-outline" 
                      variant="text" 
                      size="small" 
                      class="position-absolute top-0 right-0 ma-2"
                    ></v-btn>
                  </v-sheet>

                  <div class="px-2 pb-3">
                    <div class="text-body-2 font-weight-medium text-truncate mb-1">
                      {{ product.title }}
                    </div>
                    
                    <div class="d-flex justify-space-between align-center">
                      <span class="text-h6 font-weight-bold text-primary">
                        ${{ product.price.toFixed(0) }}
                      </span>
                      
                      <div class="d-flex align-center">
                        <v-icon 
                          v-for="(badgeColor, i) in product.ecoBadge" 
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
