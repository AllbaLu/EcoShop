<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToFullDetail = () => {
  if (selectedProduct.value) {
    // Navegamos a la ruta del producto pasando su ID
    router.push({ name: 'ProductDetail', params: { id: selectedProduct.value.id } });
  }
};

// Variables Retroactivas

const selectedKeywords = ref(["Primavera", "Inteligente", "Moderno"]);
const priceRange = ref([20, 80]);
const sortOption = ref("new");

// Variables para el Diálogo de Detalle
const showProductDialog = ref(false);
const selectedProduct = ref(null);

// Funcion: Abrir detalle
const openProductDetail = (product) => {
  selectedProduct.value = product;
  showProductDialog.value = true;
};

// Filtrar recomendaciones por ID
const getRecommendations = (ids) => {
  if (!ids) return [];
  return products.value.filter(p => ids.includes(p.id));
};

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
    title: "Cepillo de dientes de bambú", 
    price: 20, 
    rating: 3.5, 
    imagePlaceholder: "mdi-toothbrush", 
    ecoBadges: ["#375A0A", "#E6EB51"],
    description: 'Cepillo 100% biodegradable. Las cerdas son de nylon-4 libre de BPA y el mango es de bambú Moso cultivado de forma sostenible.',
    materials: 'Bambú Moso, Nylon-4',
    origin: 'Fabricado en Vietnam (Comercio Justo)',
    emissions: '0.2kg CO2e (Carbono Neutral)',
    recommendations: [2, 3]
  },
  { 
    id: 2, 
    title: "Camiseta de Algodón Orgánico", 
    price: 25.00, 
    rating: 5, 
    imagePlaceholder: "mdi-tshirt-crew", 
    ecoBadges: ['#375A0A'],
    description: 'Camiseta básica suave y transpirable. Cultivada sin pesticidas tóxicos y con un uso reducido de agua.',
    materials: '100% Algodón Orgánico',
    origin: 'Perú',
    emissions: '4.5kg CO2e',
    recommendations: [1, 6]
  },
  { 
    id: 3, 
    title: "Botella de Vidrio Reciclado", 
    price: 18.00, 
    rating: 4, 
    imagePlaceholder: "mdi-bottle-wine", 
    ecoBadges: [],
    description: 'Botella reutilizable de alta resistencia.',
    materials: 'Vidrio 100% reciclado',
    origin: 'Local',
    emissions: '1.2kg CO2e',
    recommendations: [1]
  },
  { 
    id: 4, 
    title: "Cuaderno Ecológico", 
    price: 15.00, 
    rating: 4.8, 
    imagePlaceholder: 'mdi-notebook', 
    ecoBadges: ['#375A0A'],
    description: 'Hojas de papel reciclado y tapa dura.',
    materials: 'Papel reciclado, Cartón',
    origin: 'Brasil',
    emissions: '0.8kg CO2e',
    recommendations: [5]
  },
  { 
    id: 5, 
    title: "Batería Solar", 
    price: 45.00, 
    rating: 4.2, 
    imagePlaceholder: 'mdi-battery-charging', 
    ecoBadges: ['#E6EB51'],
    description: 'Carga tus dispositivos con energía limpia.',
    materials: 'Plástico reciclado, Celdas solares',
    origin: 'China',
    emissions: '12kg CO2e',
    recommendations: [4]
  },
  { 
    id: 6, 
    title: "Mochila de Cáñamo", 
    price: 60.00, 
    rating: 4.9, 
    imagePlaceholder: "mdi-bag-personal", 
    ecoBadges: ['#375A0A', '#010101'],
    description: 'Resistente y estilosa para el día a día.',
    materials: 'Fibra de cáñamo natural',
    origin: 'Nepal',
    emissions: '3.1kg CO2e',
    recommendations: [2]
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

            <v-card flat class="product-card cursor-pointer h-100" @click="openProductDetail(product)">
              <v-sheet
                class="d-flex align-center justify-center mb-3 rounded-lg position-relative bg-grey-lighten-2"
                style="background-color: #e0e0e0 !important; min-height: 280px;"
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
    <v-dialog v-model="showProductDialog" max-width="900" scrollable>
      <v-card v-if="selectedProduct" class="rounded-lg">
        
        <div class="d-flex justify-end pa-2">
          <v-btn icon="mdi-close" variant="text" @click="showProductDialog = false"></v-btn>
        </div>

        <v-card-text class="pa-0">
          <v-container>
            <v-row>
              
              <v-col cols="12" md="6">
                <v-sheet
                  color="grey-lighten-4"
                  height="400"
                  class="d-flex align-center justify-center rounded-lg"
                >
                  <v-icon :icon="selectedProduct.imagePlaceholder" size="150" color="grey-lighten-1"></v-icon>
                </v-sheet>
              </v-col>

              <v-col cols="12" md="6" class="pl-md-6">
                
                <h2 class="text-h4 font-weight-bold text-forest mb-2">{{ selectedProduct.title }}</h2>
                <div class="d-flex align-center mb-4">
                  <span class="text-h5 font-weight-medium mr-4">${{ selectedProduct.price.toFixed(2) }}</span>
                  <v-rating 
                    :model-value="selectedProduct.rating" 
                    color="amber" 
                    density="compact" 
                    half-increments 
                    readonly 
                    size="small"
                  ></v-rating>
                  <span class="text-caption text-grey ml-2">({{ selectedProduct.rating }})</span>
                </div>

                <p class="text-body-1 text-grey-darken-2 mb-6">
                  {{ selectedProduct.description || 'Descripción no disponible.' }}
                </p>

                <v-divider class="mb-4"></v-divider>

                <div class="mb-2">
                  <strong class="text-forest"><v-icon icon="mdi-leaf" size="small" class="mr-1"/> Materiales:</strong> 
                  <span class="text-body-2 ml-2">{{ selectedProduct.materials || 'N/A' }}</span>
                </div>
                
                <div class="mb-2">
                  <strong class="text-forest"><v-icon icon="mdi-map-marker" size="small" class="mr-1"/> Origen:</strong> 
                  <span class="text-body-2 ml-2">{{ selectedProduct.origin || 'N/A' }}</span>
                </div>
                
                <div class="mb-4">
                  <strong class="text-forest"><v-icon icon="mdi-cloud-check" size="small" class="mr-1"/> Emisiones:</strong> 
                  <span class="text-body-2 ml-2">{{ selectedProduct.emissions || 'Calculando...' }}</span>
                </div>

                <div class="mb-6" v-if="selectedProduct.ecoBadges.length">
                  <strong class="text-forest d-block mb-2 text-caption text-uppercase">Certificaciones:</strong>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip 
                      v-for="(color, i) in selectedProduct.ecoBadges" 
                      :key="i"
                      :color="color"
                      variant="tonal"
                      size="small"
                      class="mr-2 mb-2"
                    >
                      {{ color === '#375A0A' ? 'Orgánico' : (color === '#E6EB51' ? 'Reciclable' : 'Fair Trade') }}
                    </v-chip>
                  </div>
                </div>

                <div class="d-flex flex-column gap-2">
                  <v-btn block color="primary" size="large" rounded="pill" class="mb-2 text-none">
                    Añadir al Carrito
                  </v-btn>

                  <v-btn 
                    variant="text" 
                    block 
                    size="small" 
                    class="text-decoration-underline text-caption"
                    @click="goToFullDetail"
                  >
                    Ver página completa del producto
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-8" v-if="selectedProduct.recommendations?.length">
              <v-col cols="12">
                <h3 class="text-h6 font-weight-bold mb-4">También te podría interesar</h3>
              </v-col>
              
              <v-col 
                v-for="recProd in getRecommendations(selectedProduct.recommendations)" 
                :key="recProd.id"
                cols="6" md="3"
              >
                <v-card flat class="bg-grey-lighten-5 cursor-pointer pa-2" @click="openProductDetail(recProd)">
                  <v-sheet height="80" color="transparent" class="d-flex align-center justify-center mb-2">
                    <v-icon :icon="recProd.imagePlaceholder" size="40" color="grey"></v-icon>
                  </v-sheet>
                  <div class="text-caption font-weight-bold text-truncate">{{ recProd.title }}</div>
                  <div class="text-caption text-forest">${{ recProd.price }}</div>
                </v-card>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
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
