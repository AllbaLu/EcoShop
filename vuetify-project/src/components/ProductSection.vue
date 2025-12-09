<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/useCartStore';

const cart = useCartStore();

// --- 1. VARIABLES DE BÚSQUEDA Y FILTROS ---
const searchQuery = ref(''); // Texto del buscador
const showFilters = ref(false); // Mostrar/Ocultar panel de filtros

// Filtros
const selectedTags = ref([]);
const selectedSizes = ref([]);
const selectedColors = ref([]); // <--- NUEVO: Para filtro de color
const priceRange = ref([0, 100]);
const sortOption = ref("new");

// Variables del Modal
const showProductDialog = ref(false);
const selectedProduct = ref(null);

// --- 2. DATOS ESTÁTICOS ---
const availableTags = ["Baño", "Ropa", "Cocina", "Oficina", "Tecnología", "Viaje", "Zero Waste"];

// Mapeo de colores (Nombre -> Hexadecimal que usas en ecoBadges)
const filterColors = [
  { name: "Verde Oscuro", hex: "#375A0A" },
  { name: "Lima", hex: "#E6EB51" },
  { name: "Negro", hex: "#010101" },
  { name: "Blanco", hex: "#F1FFFF" },
  { name: "Celeste", hex: "#C8E8FF" }
  // Agrega más si tus productos tienen otros colores en 'ecoBadges'
];

// --- 3. DATOS DE PRODUCTOS ---
const products = ref([
  {
    id: 1,
    name: "Pelota Fetch",
    price: 7.99, rating: 3.5,
    image: new URL('@/assets/productos/becopets1.webp', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Juguetes'],
    description: `Pelota compatible con lanzadores, en colores brillantes. 
        Segura para los dientes al atraparla, hecha de caucho natural suave y elástico. 
        Tiene un agujero en el centro para un juego más seguro (y silba cuando vuela). 
        Los colores brillantes la hacen más fácil de ver entre el pasto alto.`,
    materials: '54% caucho natural, 11% caucho sintético, colorantes y aditivos',
    origin: {
      name: 'Beco pets',
      url: 'https://www.becopets.com/products/natural-rubber-fetch-ball'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },
  {
    id: 2,
    name: "Slinger Pebble",
    price: 12.99, rating: 4.5,
    image: new URL('@/assets/productos/becopets2.webp', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Juguetes'],
    description: `Huevo con cuerda para lanzar, buscar y tirar.
    Seguro para los dientes al atraparlo y durante el juego.
    Mango de cuerda larga para mayor distancia de lanzamiento
    y colores brillantes.`,
    materials: '54% caucho natural, 11% caucho sintético, colorantes, aditivos y cuerda de poliéster reciclado (rPET)',
    origin: {
      name: 'Beco pets',
      url: 'https://www.becopets.com/products/natural-rubber-pebble-slinger-toy?variant=44410784055548'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },
  {
    id: 3,
    name: "Treat Bone",
    price: 10.99, rating: 5.0,
    image: new URL('@/assets/productos/becopets3.webp', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Juguetes'],
    description: `Resistente juguete para masticar, 
    ideal para perros con mordida fuerte. Ningún juguete es indestructible, 
    pero este se acerca bastante. Abertura en cada extremo para rellenar 
    con los premios favoritos de tu perro.`,
    materials: '54% caucho natural, 11% caucho sintético, colorantes y aditivos.',
    origin: {
      name: 'Beco pets',
      url: 'https://www.becopets.com/products/natural-rubber-chew-bone?variant=44410787234044'
    }
  },

  {
    id: 4,
    name: "Arena para gatitos",
    price: 6.95, rating: 4.5,
    image: new URL('@/assets/productos/sanicat1.png', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Arena, Gatos'],
    description: `La fragancia de valeriana de la arena está especialmente 
        formulada para facilitar el adiestramiento de los gatitos y facilitar 
        el uso de la caja de arena, mientras que los finos gránulos son respetuosos 
        con sus patitas y piel sensibles y apenas generan polvo, por lo que el entorno 
        se mantiene limpio y fresco tanto para ti como para tu gato.`,
    materials: 'Sepiolita natural',
    origin: {
      name: 'Sanicat',
      url: 'https://www.sanicat.com/es/producto/mejor-arena-gatitos/'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },
  {
    id: 5,
    name: "Arena para gatos Advanced Hygiene sin fragancia",
    price: 6.95, rating: 4.0,
    image: new URL('@/assets/productos/sanicat2.jpg', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Arena, Gatos'],
    description: `Arena absorbente superior que atrapa la orina y 
        controla los malos olores hasta tres veces más tiempo que las 
        arenas no aglomerantes convencionales. Formato: 5L`,
    materials: 'Diatomita natural.',
    origin: {
      name: 'Sanicat',
      url: 'https://www.sanicat.com/es/producto/arena-para-gatos-advanced-hygiene-sin-fragancia/'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },

  {
    id: 6,
    name: "Sanicat Diamonds - Aroma Aloe Vera",
    price: 6.00, rating: 4.3,
    image: new URL('@/assets/productos/sanicat3.png', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Arena, Gatos'],
    description: `con aroma de aloe vera para una frescura continua. Esta 
        arena es muy adecuada para dueños de gatos que no tienen tiempo de limpiar 
        a menudo la bandeja de arena.Gracias a su alta capacidad de absorción y 
        control de olores, esta arena absorbe la humedad al instante manteniendo 
        la bandeja seca. Formato: 5L`,
    materials: 'Gel de sílice',
    origin: {
      name: 'Sanicat',
      url: 'https://www.sanicat.com/es/producto/diamonds-aloe-vera/'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },



  {
    id: 7,
    name: "Lima de uñas de diamante Safari",
    price: 6.20, rating: 4.5,
    image: new URL('@/assets/productos/iherb1.avif', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Aseo, Perros'],
    description: `Producto especialmente contorneado para las uñas de las mascotas.
        Mantiene las uñas suaves y saludables. Cortar y limar las uñas de forma adecuada 
        y con regularidad es importante para la comodidad y la salud de su mascota.`,
    materials: 'Lima de diamante',
    origin: {
      name: 'iHerb',
      url: 'https://cl.iherb.com/pr/safari-diamond-nail-file-1-count/105847'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },
  {
    id: 8,
    name: "Cortauñas de acero inoxidable Safari",
    price: 9.40, rating: 4.5,
    image: new URL('@/assets/productos/iherb2.avif', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Aseo, Perros'],
    description: `Cortauñas de acero inoxidable para perros pequeños
        con tope de seguridad para evitar lesiones. Corte afilado para resultados 
        efectivos y duraderos`,
    origin: {
      name: 'iHerb',
      url: 'https://cl.iherb.com/pr/safari-stainless-steel-nail-trimmer-small-dogs-1-tool/105844'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },

  {
    id: 9,
    name: "Cepillo suave y liso Safari",
    price: 9.40, rating: 4.5,
    image: new URL('@/assets/productos/iherb3.avif', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Aseo, Perros'],
    description: `Ideal para perros medianos, con puntas recubiertas
        para mayor comodidad. Elimina los enredos y el cabello suelto. Su uso frecuente
        ayuda a mantener un pelaje saludable`,
    origin: {
      name: 'iHerb',
      url: 'https://cl.iherb.com/pr/safari-soft-slicker-brush-for-medium-dogs-1-brush/98950'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },
  {
    id: 10,
    name: "Ecos - Quitamanchas y quita olores , limón",
    price: 10.30, rating: 4.6,
    image: new URL('@/assets/productos/iherb4.avif', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Aseo, Mascotas'],
    description: `Extraordinariamente eficaz en las manchas difíciles
        , ya que utiliza enzimas activas e ingredientes cuidadosamente 
        seleccionados que no decoloran los colores. Elimina los olores
        en su origen y no necesita enjuage. Formato: 650 ml`,
    materials: 'Biodegradable.',
    origin: {
      name: 'iHerb',
      url: 'https://cl.iherb.com/pr/earth-friendly-products-ecos-stain-odor-remover-lemon-22-fl-oz-650-ml/110629'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },
  {
    id: 11,
    name: "Earth Rated - Bolsas para desechos de perros , sin fragancia",
    price: 10.30, rating: 4.6,
    image: new URL('@/assets/productos/iherb5.avif', import.meta.url).href,
    ecoBadges: ["#375A0A", "#E6EB51"],
    sizes: ['S'], tags: ['Aseo, Perros'],
    description: `Bolsas ecológicas extrafuertes y extralargas
        (9x13in). Garantía 100% a prueba de fugas. Paquete económico: 270 bolsas`,
    materials: 'Bolsas ecológicas.',
    origin: {
      name: 'iHerb',
      url: 'https://cl.iherb.com/pr/earth-rated-dog-poop-bags-unscented-270-bags/104298'

    },
    emissions: '0.2kg CO2e',
    recommendations: [2, 3]
  },



  {
    id: 20,
    name: "Camiseta de Algodón",
    price: 25.00, rating: 5, image: "mdi-tshirt-crew",
    ecoBadges: ['#375A0A'],
    sizes: ['S', 'M', 'L'], tags: ['Ropa'],
    description: 'Camiseta básica suave.', materials: 'Algódón', origin: 'Perú', emissions: '4.5kg CO2e', recommendations: [1, 6]
  },
  {
    id: 30,
    name: "Botella de Vidrio",
    price: 18.00, rating: 4, image: "mdi-bottle-wine",
    ecoBadges: ["#F1FFFF", "#C8E8FF"],
    sizes: ['M'],
    tags: ['Cocina', 'Viaje'],
    description: 'Dile adiós a los plásticos de un solo uso con esta botella de vidrio de borosilicato de alta resistencia. Soporta choques térmicos (bebidas frías o calientes) y cuenta con una funda de silicona antideslizante para protección extra. Su tapa de bambú hermética con sello de silicona asegura que no haya derrames.',
    materials: 'Vidrio',
    origin: 'Local',
    emissions: '1.2kg CO2e',
    recommendations: [1]
  },
  {
    id: 40,
    name: "Cuaderno Ecológico",
    price: 15.00, rating: 4.8, image: 'mdi-notebook',
    ecoBadges: ['#375A0A'],
    sizes: ['M'],
    tags: ['Oficina'],
    description: 'Captura tus ideas en este cuaderno premium. Sus 120 páginas están hechas de papel 100% reciclado post-consumo de 90g, evitando que la tinta traspase. La tapa dura de cartón reciclado es resistente y elegante. El proceso de blanqueado es libre de cloro (TCF), protegiendo los recursos hídricos.', materials: 'Papel',
    origin: 'Brasil',
    emissions: '0.8kg CO2e',
    recommendations: [5]
  },
  {
    id: 50,
    name: "Batería Solar",
    price: 45.00, rating: 4.2, image: 'mdi-battery-charging',
    ecoBadges: ['#E6EB51', "#C8E8FF"],
    sizes: ['S'],
    tags: ['Tecnología', 'Viaje'],
    description: 'Carga con energía limpia.',
    materials: 'Plástico reciclado',
    origin: 'China',
    emissions: '12kg CO2e',
    recommendations: [4]
  },
  {
    id: 60,
    name: "Mochila de Cáñamo",
    price: 60.00, rating: 4.9, image: "mdi-bag-personal",
    ecoBadges: ['#375A0A', '#010101'],
    sizes: ['L'], tags: ['Viaje', 'Ropa'],
    description: 'Resistente y estilosa.', materials: 'Cáñamo', origin: 'Nepal', emissions: '3.1kg CO2e', recommendations: [2]
  }
]);

// --- 4. LÓGICA DE FILTRADO AVANZADA ---
const filteredProducts = computed(() => {
  let result = products.value.filter(p => {

    // A. Búsqueda por Texto (Nombre)
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());

    // B. Filtro Precio
    const matchPrice = p.price >= priceRange.value[0] && p.price <= priceRange.value[1];

    // C. Filtro Tamaño
    const matchSize = selectedSizes.value.length === 0 || (p.sizes && p.sizes.some(s => selectedSizes.value.includes(s)));

    // D. Filtro Etiquetas
    const matchTags = selectedTags.value.length === 0 || (p.tags && p.tags.some(t => selectedTags.value.includes(t)));

    // E. Filtro COLORES
    const matchColor = selectedColors.value.length === 0 ||
      (p.ecoBadges && p.ecoBadges.some(c => selectedColors.value.includes(c)));

    return matchSearch && matchPrice && matchSize && matchTags && matchColor;
  });

  // Ordenamiento
  if (sortOption.value === 'asc') result.sort((a, b) => a.price - b.price);
  else if (sortOption.value === 'desc') result.sort((a, b) => b.price - a.price);
  else if (sortOption.value === 'rating') result.sort((a, b) => b.rating - a.rating);
  else result.sort((a, b) => b.id - a.id);

  return result;
});

// --- FUNCIONES ---
const openProductDetail = (p) => { selectedProduct.value = p; showProductDialog.value = true; };
const addToCart = (p) => {
  const item = p || selectedProduct.value;
  if (item) { cart.addItem({ ...item }); if (showProductDialog.value) showProductDialog.value = false; }
};
const getRecommendations = (ids) => (!ids ? [] : products.value.filter(p => ids.includes(p.id)));
</script>

<template>
  <v-container fluid class="bg-white py-8" theme="light">

    <v-row align="center" class="mb-6">

      <v-col>
        <v-text-field v-model="searchQuery" label="Buscar productos sostenibles..." prepend-inner-icon="mdi-magnify"
          clearable variant="outlined" density="compact" hide-details rounded="pill" />
      </v-col>

      <v-col cols="auto">
        <v-btn variant="tonal" height="40" class="px-6" rounded="pill">Buscar</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn variant="outlined" height="40" width="40" class="pa-0" rounded="circle"
          @click="showFilters = !showFilters" :color="showFilters ? 'forest' : ''">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12" md="auto" class="d-flex justify-end mt-3 mt-md-0">
        <v-btn-toggle v-model="sortOption" mandatory density="compact" variant="text" class="sort-toggle">
          <v-btn value="new" class="sort-btn" size="small">Nuevo</v-btn>
          <v-btn value="asc" class="sort-btn" size="small">Precio Asc</v-btn>
          <v-btn value="desc" class="sort-btn" size="small">Precio Desc</v-btn>
          <v-btn value="rating" class="sort-btn" size="small">Calif.</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div v-if="showFilters" class="mb-8 pa-4 bg-grey-lighten-5 rounded-lg border">
        <v-row>

          <v-col cols="12" md="4">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Etiquetas</h4>
            <v-chip-group v-model="selectedTags" column multiple>
              <v-chip v-for="tag in availableTags" :key="tag" :value="tag" filter variant="outlined" size="small"
                color="forest">{{ tag }}</v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12" md="3">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Rango de Precio</h4>
            <div class="text-caption mb-1">${{ priceRange[0] }} - ${{ priceRange[1] }}</div>
            <v-range-slider v-model="priceRange" max="100" min="0" step="5" thumb-size="14" track-color="grey-lighten-2"
              track-fill-color="forest" thumb-color="forest" hide-details></v-range-slider>
          </v-col>

          <v-col cols="12" md="2">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Tamaño</h4>
            <div class="d-flex flex-column">
              <v-checkbox v-model="selectedSizes" label="Chico (S)" value="S" density="compact" hide-details
                color="forest" class="mt-0 pt-0"></v-checkbox>
              <v-checkbox v-model="selectedSizes" label="Mediano (M)" value="M" density="compact" hide-details
                color="forest" class="mt-0 pt-0"></v-checkbox>
              <v-checkbox v-model="selectedSizes" label="Grande (L)" value="L" density="compact" hide-details
                color="forest" class="mt-0 pt-0"></v-checkbox>
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Colores</h4>
            <div class="d-flex flex-wrap gap-2">
              <div v-for="(color, index) in filterColors" :key="index"
                class="d-flex align-center mr-4 mb-2 cursor-pointer"
                @click="selectedColors.includes(color.hex) ? selectedColors = selectedColors.filter(c => c !== color.hex) : selectedColors.push(color.hex)">
                <v-icon
                  :icon="selectedColors.includes(color.hex) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                  :color="color.hex" class="mr-2"></v-icon>
                <span class="text-body-2" :class="{ 'font-weight-bold': selectedColors.includes(color.hex) }">{{
                  color.name }}</span>
              </div>
            </div>
          </v-col>

        </v-row>
      </div>
    </v-expand-transition>

    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" xl="3">
        <v-card flat class="product-card cursor-pointer h-100 d-flex flex-column" @click="openProductDetail(product)">
          <v-sheet color="grey-lighten-4" height="280"
            class="d-flex align-center justify-center mb-3 rounded-lg position-relative overflow hidden">
            <img :src="product.image" alt="Imagen del producto" class="w-100 h-100" style="object-fit: cover;">
            <!-- <v-icon :icon="product.image" size="80" color="grey-lighten-1"></v-icon> -->
            <v-btn icon="mdi-heart-outline" variant="text" size="small"
              class="position-absolute top-0 right-0 ma-2"></v-btn>
          </v-sheet>

          <div class="px-1 pb-2 flex-grow-1">
            <div class="text-body-1 font-weight-medium text-truncate">{{ product.name }}</div>
            <div class="d-flex justify-space-between align-center mt-2">
              <span class="text-body-2 font-weight-bold">${{ product.price.toFixed(2) }}</span>
              <div class="d-flex align-center">
                <v-icon v-for="(badgeColor, i) in product.ecoBadges" :key="i" icon="mdi-circle" size="x-small"
                  :color="badgeColor" class="ml-1"></v-icon>
              </div>
            </div>
          </div>

          <v-btn block variant="tonal" color="forest" size="small" class="mt-2 text-none"
            @click.stop="addToCart(product)">
            <v-icon start icon="mdi-cart-plus"></v-icon> Añadir
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="filteredProducts.length === 0">
      <v-col class="text-center py-10 text-grey">
        No se encontraron productos con esos filtros.
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
                <v-sheet color="grey-lighten-4" height="400"
                  class="d-flex align-center justify-center rounded-lg overflow-hidden">
                  <img :src="selectedProduct.image" alt="Imagen del producto" class="w-100 h-100"
                    style="object-fit: cover;">

                </v-sheet>
              </v-col>
              <v-col cols="12" md="6" class="pl-md-6">
                <h2 class="text-h4 font-weight-bold text-forest mb-2">{{ selectedProduct.name }}</h2>
                <div class="d-flex align-center mb-4">
                  <span class="text-h5 font-weight-medium mr-4">${{ selectedProduct.price.toFixed(2) }}</span>
                  <v-rating :model-value="selectedProduct.rating" color="amber" density="compact" half-increments
                    readonly size="small"></v-rating>
                  <span class="text-caption text-grey ml-2">({{ selectedProduct.rating }})</span>
                </div>
                <p class="text-body-1 text-grey-darken-2 mb-6">{{ selectedProduct.description || 'Sin descripción.' }}
                </p>
                <v-divider class="mb-4"></v-divider>
                <div class="mb-2"><strong class="text-forest">Materiales:</strong> <span class="text-body-2 ml-2">{{
                  selectedProduct.materials || 'N/A' }}</span></div>
                <div class="mb-2"><strong class="text-forest">Origen:</strong>
                  <span v-if="selectedProduct.origin" class="text-body-2 ml-2">
                    <a :href="selectedProduct.origin.url" target="_blank" rel="noopener"
                      class="text-forest text-decoration-underline">
                      {{ selectedProduct.origin.name }}
                    </a>
                  </span>
                  <span v-else class="text-body-2 ml-2"></span>
                </div>
                <div class="mb-4"><strong class="text-forest">Emisiones:</strong> <span class="text-body-2 ml-2">{{
                  selectedProduct.emissions || 'N/A' }}</span></div>
                <v-btn block color="forest" size="large" rounded="pill" class="mb-4 text-none bg-forest text-white"
                  @click="addToCart()">Añadir al Carrito</v-btn>
              </v-col>
            </v-row>
            <v-row class="mt-8" v-if="selectedProduct.recommendations?.length">
              <v-col cols="12">
                <h3 class="text-h6 font-weight-bold mb-4">También te podría interesar</h3>
              </v-col>
              <v-col v-for="recProd in getRecommendations(selectedProduct.recommendations)" :key="recProd.id" cols="6"
                md="3">
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
.text-forest {
  color: #375A0A !important;
}

.bg-forest {
  background-color: #375A0A !important;
}

.sort-toggle .v-btn--active {
  background-color: #010101 !important;
  color: white !important;
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

.border-icon {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
}
</style>