<script setup>
import { ref } from 'vue';

// Variables Retroactivas

const selectedKeywords = ref(["Primavera", "Inteligente", "Moderno"]);
const priceRange = ref([20, 80]);
const sortOption = ref("new");

const filterColors = [
  { name: "Blanco", hex: "#F1FFFF" },
  { name: "Celeste", hex: "#C8E8FF" },
  { name: "Lima", hex: "#E63B51" },
  { name: "Verde Oscuro", hex: "#375A0A" },
  { name: "Negro", hex: "#010101" } 
];

// Datos Productos

const products = ref([
  {
    id: 1,
    title: "Cepillo de dientes de bambu",
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
]);
</script>

<template>
  <v-container fluid class="bg-white py-8">
    <v-row>
      
      <v-col cols="12" md="3" lg="2" class="pr-md-6">
        
        <div class="mb-8">
          <h4 class="text-subtitle-2 font-weight-bold mb-3">Etiquetas</h4>
          <v-chip-group column>
            <v-chip 
              v-for="key in selectedKeywords" 
              :key="key"
              closable 
              variant="outlined" 
              size="small" 
              class="text-capitalize"
            >
              {{ key }}
            </v-chip>
          </v-chip-group>
        </div>

        <div class="mb-8">
          <v-checkbox
            v-for="i in ['Materiales Sostenibles', 'Carbono Neutral', 'Fair Trade']"
            :key="i"
            :label="i"
            density="compact"
            hide-details
            color="forest"
            class="my-0 py-0"
          ></v-checkbox>
        </div>

        <div class="mb-8">
          <div class="d-flex justify-space-between text-caption mb-2 font-weight-medium">
            <span>Rango de Precio</span>
            <span>${{ priceRange[0] }} - ${{ priceRange[1] }}</span>
          </div>
          <v-range-slider
            v-model="priceRange"
            max="200"
            min="0"
            step="5"
            thumb-size="14"
            track-color="grey-lighten-2"
            track-fill-color="forest"
            thumb-color="forest"
            hide-details
            elevation="0"
          ></v-range-slider>
        </div>

        <div class="mb-8">
          <h4 class="text-subtitle-2 font-weight-bold mb-3">Color</h4>
          <div v-for="(color, index) in filterColors" :key="index" class="d-flex align-center mb-2 cursor-pointer">
            <v-icon icon="mdi-checkbox-blank" :color="color.hex" class="mr-3 border-icon"></v-icon>
            <span class="text-body-2 text-grey-darken-1">{{ color.name }}</span>
          </div>
        </div>

        <div class="mb-8">
          <h4 class="text-subtitle-2 font-weight-bold mb-3">Tamaño</h4>
          <v-checkbox
            v-for="size in ['Chico (S)', 'Mediano (M)', 'Grande (L)']"
            :key="size"
            :label="size"
            density="compact"
            hide-details
            color="forest"
          ></v-checkbox>
        </div>
      </v-col>

      <v-col cols="12" md="9" lg="10">
        
        <v-row align="center" class="mb-6">
          <v-col cols="12" sm="5" md="4">
            <v-text-field
              density="compact"
              variant="outlined"
              placeholder="Buscar productos sostenibles..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              rounded="pill"
              bg-color="grey-lighten-5"
              color="forest"
            ></v-text-field>
          </v-col>
          
          <v-spacer></v-spacer>
          
          <v-col cols="12" sm="7" md="8" class="text-sm-right">
            <v-btn-toggle 
              v-model="sortOption" 
              mandatory 
              density="compact" 
              variant="text" 
              class="sort-toggle"
            >
              <v-btn value="new" class="sort-btn" size="small">Nuevo</v-btn>
              <v-btn value="asc" class="sort-btn" size="small">Precio Asc</v-btn>
              <v-btn value="desc" class="sort-btn" size="small">Precio Desc</v-btn>
              <v-btn value="rating" class="sort-btn" size="small">Calificacion</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            xl="3"
          >
            <v-card flat class="product-card cursor-pointer h-100">
              <v-sheet
                color="grey-lighten-4"
                height="280"
                class="d-flex align-center justify-center mb-3 rounded-lg position-relative"
              >
                <v-icon :icon="product.image" size="80" color="grey-lighten-1"></v-icon>
                
                <v-btn icon="mdi-heart-outline" variant="text" size="small" class="position-absolute top-0 right-0 ma-2"></v-btn>
              </v-sheet>

              <div class="px-1 pb-2">
                <div class="text-body-1 font-weight-medium text-truncate">{{ product.title }}</div>
                
                <div class="d-flex justify-space-between align-center mt-2">
                  <span class="text-body-2 font-weight-bold">${{ product.price.toFixed(2) }}</span>
                  
                  <div class="d-flex align-center">
                    <v-tooltip location="top" text="Nivel de Impacto Ecologico">
                      <template v-slot:activator="{ props }">
                        <div v-bind="props" class="d-flex">
                           <v-icon 
                            v-for="(badgeColor, i) in product.ecoBadge" 
                            :key="i" 
                            icon="mdi-circle" 
                            size="x-small" 
                            :color="badgeColor"
                            class="ml-1"
                          ></v-icon>
                        </div>
                      </template>
                    </v-tooltip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-center mt-12">
           <v-btn variant="outlined" rounded="pill" color="forest">Ver más productos</v-btn>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Definición de colores locales */
.text-forest { color: #375A0A !important; }
.bg-forest { background-color: #375A0A !important; }

/* Estilo personalizado para los botones de ordenamiento */
.sort-toggle .v-btn {
  color: #757575;
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500;
}

/* El botón activo se pone negro*/
.sort-toggle .v-btn--active {
  background-color: #010101 !important;
  color: white !important;
}

/* Hover en las tarjetas de producto */
.product-card:hover .v-sheet {
  background-color: #E6EB51 !important; /* Color Lima al hacer hover */
  transition: background-color 0.3s ease;
}

.product-card:hover .v-icon {
  color: #375A0A !important; /* Icono verde bosque al hover */
}

.cursor-pointer {
  cursor: pointer;
}

/* Borde sutil para el color blanco en el filtro */
.border-icon {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
}
</style>
