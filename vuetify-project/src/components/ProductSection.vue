<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/useCartStore';

// --- 1. CONFIGURACIÓN Y DATOS ---
const cart = useCartStore();

// Filtros
const selectedKeywords = ref(["Primavera", "Inteligente", "Moderno"]);
const priceRange = ref([0, 100]);
const sortOption = ref("new");
const selectedSizes = ref([]);

// Estado del Modal
const showProductDialog = ref(false);
const selectedProduct = ref(null);

// --- 2. DATOS DE PRODUCTOS (CORREGIDOS) ---
const products = ref([
  { 
    id: 1, 
    name: "Cepillo de dientes de bambú", 
    price: 20, 
    rating: 3.5, 
    image: "mdi-toothbrush", 
    ecoBadges: ["#375A0A", "#E6EB51"], 
    description: 'Este set es la alternativa perfecta al plástico. El mango ergonómico está tallado en bambú Moso 100% compostable, naturalmente antimicrobiano y resistente al agua. Las cerdas de nylon-4 de dureza media limpian eficazmente sin dañar las encías y son libres de BPA. Viene en un empaque de cartón reciclado sin pegamentos tóxicos.',
    materials: 'Bambú Moso, Nylon-4',
    origin: 'Vietnam',
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },
  { 
    id: 2, 
    name: "Camiseta de Algodón Orgánico", 
    price: 25.00, 
    rating: 5, 
    image: "mdi-tshirt-crew", 
    ecoBadges: ['#375A0A'], 
    description: 'Confeccionada con algodón orgánico de fibra larga, garantiza una suavidad excepcional y una durabilidad superior. El cultivo de este algodón utiliza un 91% menos de agua y evita pesticidas nocivos. Su corte clásico y atemporal la convierte en una prenda versátil para cualquier ocasión, diseñada para durar años en tu armario.',
    materials: '100% Algodón Orgánico',
    origin: 'Perú',
    emissions: '4.5kg CO2e',
    recommendations: [1, 6]
  },
  { 
    id: 3, 
    name: "Botella de Vidrio Reciclado", 
    price: 18.00, 
    rating: 4, 
    image: "mdi-bottle-wine", 
    ecoBadges: [], 
    description: 'Dile adiós a los plásticos de un solo uso con esta botella de vidrio de borosilicato de alta resistencia. Soporta choques térmicos (bebidas frías o calientes) y cuenta con una funda de silicona antideslizante para protección extra. Su tapa de bambú hermética con sello de silicona asegura que no haya derrames.',
    materials: 'Vidrio 100% reciclado',
    origin: 'Local',
    emissions: '1.2kg CO2e',
    recommendations: [1]
  },
  { 
    id: 4, 
    name: "Cuaderno Ecológico", 
    price: 15.00, 
    rating: 4.8, 
    image: 'mdi-notebook', 
    ecoBadges: ['#375A0A'], 
    description: 'Captura tus ideas en este cuaderno premium. Sus 120 páginas están hechas de papel 100% reciclado post-consumo de 90g, evitando que la tinta traspase. La tapa dura de cartón reciclado es resistente y elegante. El proceso de blanqueado es libre de cloro (TCF), protegiendo los recursos hídricos.',
    materials: 'Papel reciclado',
    origin: 'Brasil',
    emissions: '0.8kg CO2e',
    recommendations: [5]
  },
  { 
    id: 5, 
    name: "Batería Solar", 
    price: 45.00, 
    rating: 4.2, 
    image: 'mdi-battery-charging', 
    ecoBadges: ['#E6EB51'], 
    description: 'Energía limpia en tu bolsillo. Este cargador portátil de 20,000mAh cuenta con paneles solares monocristalinos de alta eficiencia y una carcasa robusta hecha de plásticos oceánicos reciclados. Resistente a salpicaduras y polvo, incluye linterna LED integrada y dos puertos USB para carga simultánea.',
    materials: 'Plástico reciclado',
    origin: 'China',
    emissions: '12kg CO2e',
    recommendations: [4]
  },
  { 
    id: 6, 
    name: "Mochila de Cáñamo", 
    price: 60.00, 
    rating: 4.9, 
    image: "mdi-bag-personal", 
    ecoBadges: ['#375A0A', '#010101'], 
    description: 'Fabricada artesanalmente con fibras de cáñamo del Himalaya, esta mochila es tres veces más resistente que el algodón y antimicrobiana. Cuenta con un compartimento acolchado para laptops de hasta 15 pulgadas y múltiples bolsillos organizadores. Sus tintes son vegetales y libres de metales pesados.',
    materials: 'Fibra de cáñamo',
    origin: 'Nepal',
    emissions: '3.1kg CO2e',
    recommendations: [2]
  }
]);

const filterColors = [
  { name: "Blanco", hex: "#F1FFFF" },
  { name: "Celeste", hex: "#C8E8FF" },
  { name: "Lima", hex: "#E63B51" },
  { name: "Verde Oscuro", hex: "#375A0A" },
  { name: "Negro", hex: "#010101" } 
];

// --- 3. LÓGICA DE FILTRADO ---
const filteredProducts = computed(() => {
  // 1. Filtrar
  let result = products.value.filter(product => {
    // Filtro Precio
    const matchPrice = product.price >= priceRange.value[0] && product.price <= priceRange.value[1];
    
    // Filtro Talle (Si no hay talles seleccionados, muestra todo)
    const matchSize = selectedSizes.value.length === 0 || 
                      product.sizes.some(s => selectedSizes.value.includes(s));

    return matchPrice && matchSize;
  });

  if (sortOption.value === 'asc') {
    result.sort((a, b) => a.price - b.price); // Menor a Mayor
  } else if (sortOption.value === 'desc') {
    result.sort((a, b) => b.price - a.price); // Mayor a Menor
  } else if (sortOption.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating); // Mayor Rating primero
  } else {
    // 'new' u otros: Ordenar por ID descendente (los últimos agregados primero)
    result.sort((a, b) => b.id - a.id);
  }

  return result;
});

// --- 4. FUNCIONES ---

const openProductDetail = (product) => {
  selectedProduct.value = product;
  showProductDialog.value = true;
};

const addToCart = (product) => {
  // Si viene un producto (desde la grilla), usa ese.
  // Si no (desde el modal), usa el selectedProduct.
  const item = product || selectedProduct.value;
  
  if (item) {
    // Clona el objeto para asegurarse de pasar una copia limpia al store
    cart.addItem({ ...item });
    if (showProductDialog.value) showProductDialog.value = false;
  }
};

const getRecommendations = (ids) => {
  if (!ids) return [];
  return products.value.filter(p => ids.includes(p.id));
};
</script>

<template>
  <v-container fluid class="bg-white py-8" theme="light">
    <v-row>
      
      <v-col cols="12" md="3" lg="2" class="pr-md-6">
        
        <div class="mb-8">
          <h4 class="text-subtitle-2 font-weight-bold mb-3">Etiquetas</h4>
          <v-chip-group column>
            <v-chip v-for="key in selectedKeywords" :key="key" closable variant="outlined" size="small" class="text-capitalize">{{ key }}</v-chip>
          </v-chip-group>
        </div>

        <div class="mb-8">
          <v-checkbox v-for="i in ['Materiales Sostenibles', 'Carbono Neutral', 'Fair Trade']" :key="i" :label="i" density="compact" hide-details color="forest" class="my-0 py-0"></v-checkbox>
        </div>

        <div class="mb-8">
          <div class="d-flex justify-space-between text-caption mb-2 font-weight-medium">
            <span>Rango de Precio</span>
            <span>${{ priceRange[0] }} - ${{ priceRange[1] }}</span>
          </div>
          <v-range-slider
            v-model="priceRange"
            max="100" min="0" step="5"
            thumb-size="14" track-color="grey-lighten-2" track-fill-color="forest" thumb-color="forest"
            hide-details elevation="0"
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
              v-model="selectedSizes" 
              label="Chico (S)" 
              value="S" 
              density="compact" hide-details color="forest"
            ></v-checkbox>
            
            <v-checkbox 
              v-model="selectedSizes" 
              label="Mediano (M)" 
              value="M" 
              density="compact" hide-details color="forest"
            ></v-checkbox>
            
            <v-checkbox 
              v-model="selectedSizes" 
              label="Grande (L)" 
              value="L" 
              density="compact" hide-details color="forest"
            ></v-checkbox>
          </div>
      </v-col>

      <v-col cols="12" md="9" lg="10">
        
        <v-row align="center" class="mb-6">
          <v-col cols="12" sm="5" md="4">
            <v-text-field density="compact" variant="outlined" placeholder="Buscar productos..." prepend-inner-icon="mdi-magnify" hide-details rounded="pill" bg-color="grey-lighten-5"></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="7" md="8" class="text-sm-right">
            <v-btn-toggle v-model="sortOption" mandatory density="compact" variant="text" class="sort-toggle">
              <v-btn value="new" class="sort-btn" size="small">Nuevo</v-btn>
              <v-btn value="asc" class="sort-btn" size="small">Precio Asc</v-btn>
              <v-btn value="rating" class="sort-btn" size="small">Calificación</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="product in filteredProducts"
            :key="product.id"
            cols="12" sm="6" md="4" xl="3"
          >
            <v-card 
              flat 
              class="product-card cursor-pointer h-100 d-flex flex-column"
              @click="openProductDetail(product)"
            >
              <v-sheet color="grey-lighten-4" height="280" class="d-flex align-center justify-center mb-3 rounded-lg position-relative">
                <v-icon :icon="product.image" size="80" color="grey-lighten-1"></v-icon>
                <v-btn icon="mdi-heart-outline" variant="text" size="small" class="position-absolute top-0 right-0 ma-2"></v-btn>
              </v-sheet>

              <div class="px-1 pb-2 flex-grow-1">
                <div class="text-body-1 font-weight-medium text-truncate">{{ product.name }}</div>
                
                <div class="d-flex justify-space-between align-center mt-2">
                  <span class="text-body-2 font-weight-bold">${{ product.price.toFixed(2) }}</span>
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
                <v-icon start icon="mdi-cart-plus"></v-icon>
                Añadir
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        
        <v-row v-if="filteredProducts.length === 0">
          <v-col class="text-center py-10 text-grey">
            No hay productos que coincidan con este precio.
          </v-col>
        </v-row>

      </v-col>
    </v-row>

    <v-dialog v-model="showProductDialog" max-width="900" scrollable>
      <v-card v-if="selectedProduct" class="rounded-lg bg-white">
        
        <div class="d-flex justify-end pa-2">
          <v-btn icon="mdi-close" variant="text" @click="showProductDialog = false"></v-btn>
        </div>

        <v-card-text class="pa-0">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-sheet color="grey-lighten-4" height="400" class="d-flex align-center justify-center rounded-lg">
                  <v-icon :icon="selectedProduct.image" size="150" color="grey-lighten-1"></v-icon>
                </v-sheet>
              </v-col>

              <v-col cols="12" md="6" class="pl-md-6">
                <h2 class="text-h4 font-weight-bold text-forest mb-2">{{ selectedProduct.name }}</h2>
                
                <div class="d-flex align-center mb-4">
                  <span class="text-h5 font-weight-medium mr-4">${{ selectedProduct.price.toFixed(2) }}</span>
                  <v-rating :model-value="selectedProduct.rating" color="amber" density="compact" half-increments readonly size="small"></v-rating>
                  <span class="text-caption text-grey ml-2">({{ selectedProduct.rating }})</span>
                </div>

                <p class="text-body-1 text-grey-darken-2 mb-6">
                  {{ selectedProduct.description || 'Sin descripción.' }}
                </p>

                <v-divider class="mb-4"></v-divider>

                <div class="mb-2"><strong class="text-forest">Materiales:</strong> <span class="text-body-2 ml-2">{{ selectedProduct.materials || 'N/A' }}</span></div>
                <div class="mb-2"><strong class="text-forest">Origen:</strong> <span class="text-body-2 ml-2">{{ selectedProduct.origin || 'N/A' }}</span></div>
                <div class="mb-4"><strong class="text-forest">Emisiones:</strong> <span class="text-body-2 ml-2">{{ selectedProduct.emissions || 'N/A' }}</span></div>

                <v-btn 
                  block 
                  color="forest" 
                  size="large" 
                  rounded="pill" 
                  class="mb-4 text-none bg-forest text-white"
                  @click="addToCart()"
                >
                  Añadir al Carrito
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="mt-8" v-if="selectedProduct.recommendations?.length">
              <v-col cols="12"><h3 class="text-h6 font-weight-bold mb-4">También te podría interesar</h3></v-col>
              <v-col v-for="recProd in getRecommendations(selectedProduct.recommendations)" :key="recProd.id" cols="6" md="3">
                <v-card flat class="bg-grey-lighten-5 cursor-pointer pa-2" @click="openProductDetail(recProd)">
                  <v-sheet height="80" color="transparent" class="d-flex align-center justify-center mb-2">
                    <v-icon :icon="recProd.image" size="40" color="grey"></v-icon>
                  </v-sheet>
                  <div class="text-caption font-weight-bold text-truncate">{{ recProd.name }}</div>
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
.text-forest { color: #375A0A !important; }
.bg-forest { background-color: #375A0A !important; }
.sort-toggle .v-btn--active { background-color: #010101 !important; color: white !important; }
.product-card:hover .v-sheet { background-color: #E6EB51 !important; transition: background-color 0.3s ease; }
.product-card:hover .v-icon { color: #375A0A !important; }
.cursor-pointer { cursor: pointer; }
.border-icon { border: 1px solid #e0e0e0; border-radius: 2px; }
</style>