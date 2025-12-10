<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFilterStore } from '@/stores/useFilterStore';


const router = useRouter();
const filterStore = useFilterStore();

// Control local para mostrar/ocultar el panel (esto es visual, no necesita store)
const showFilters = ref(false);

// Datos estáticos para los filtros (Mismos que ProductSection)
const availableTags = ["Mascotas", "Limpieza", "Hogar", "Jardín", "Cuidado Personal", "Ropa", "Tecnología", "Viaje", "Zero Waste"];
const filterColors = [
  { name: "Verde Oscuro", hex: "#375A0A" }, { name: "Lima", hex: "#E6EB51" },
  { name: "Negro", hex: "#010101" }, { name: "Marrón", hex: "#8D6E63" }, { name: "Azul", hex: "#2196F3" }
];

// Función para ir al catálogo
const goToCatalog = () => {
  // Como estamos usando el Store, los filtros ya están guardados.
  // Solo necesitamos navegar.
  router.push('/product-section'); // <--- CAMBIA ESTO POR TU RUTA REAL DEL CATÁLOGO
};
</script>

<template>
  <v-container>
    
    <v-row align="center" no-gutters>
      <v-col>
        <v-text-field
          v-model="filterStore.searchQuery"
          label="¿Qué estás buscando hoy?"
          placeholder="Ej: Cepillo de bambú..."
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          density="comfortable"
          hide-details
          rounded="pill"
          bg-color="white"
          class="elevation-1"
          @keyup.enter="goToCatalog"
        />
      </v-col>
      
      <v-col cols="auto" class="ml-2">
        <v-btn 
          variant="outlined" 
          height="48" 
          width="48" 
          class="pa-0 bg-white" 
          rounded="circle"
          @click="showFilters = !showFilters"
          :color="showFilters ? 'forest' : ''"
        >
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="auto" class="ml-2">
        <v-btn 
          color="forest" 
          height="48" 
          class="px-6 text-white text-none" 
          rounded="pill"
          @click="goToCatalog"
        >
          Buscar
        </v-btn>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div v-if="showFilters" class="mt-4 pa-6 bg-white rounded-xl elevation-2 border">
        <v-row>
          
          <v-col cols="12" md="4">
            <h4 class="text-subtitle-2 font-weight-bold mb-2 text-forest">Categorías</h4>
            <v-chip-group v-model="filterStore.selectedTags" column multiple>
              <v-chip v-for="tag in availableTags" :key="tag" :value="tag" filter variant="outlined" size="small" color="forest">{{ tag }}</v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12" md="3">
            <h4 class="text-subtitle-2 font-weight-bold mb-2 text-forest">Precio</h4>
            <div class="text-caption mb-1">${{ filterStore.priceRange[0] }} - ${{ filterStore.priceRange[1] }}</div>
            <v-range-slider v-model="filterStore.priceRange" max="150" min="0" step="5" thumb-size="14" track-color="grey-lighten-2" track-fill-color="forest" thumb-color="forest" hide-details></v-range-slider>
          </v-col>

          <v-col cols="12" md="2">
            <h4 class="text-subtitle-2 font-weight-bold mb-2 text-forest">Tamaño</h4>
            <div class="d-flex flex-column">
               <v-checkbox v-model="filterStore.selectedSizes" label="Chico (S)" value="S" density="compact" hide-details color="forest" class="mt-0 pt-0"></v-checkbox>
               <v-checkbox v-model="filterStore.selectedSizes" label="Mediano (M)" value="M" density="compact" hide-details color="forest" class="mt-0 pt-0"></v-checkbox>
               <v-checkbox v-model="filterStore.selectedSizes" label="Grande (L)" value="L" density="compact" hide-details color="forest" class="mt-0 pt-0"></v-checkbox>
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <h4 class="text-subtitle-2 font-weight-bold mb-2 text-forest">Colores</h4>
            <div class="d-flex flex-wrap gap-2">
               <div v-for="(color, index) in filterColors" :key="index" class="d-flex align-center mr-4 mb-2 cursor-pointer"
                 @click="filterStore.selectedColors.includes(color.hex) ? filterStore.selectedColors = filterStore.selectedColors.filter(c => c !== color.hex) : filterStore.selectedColors.push(color.hex)">
                 <v-icon :icon="filterStore.selectedColors.includes(color.hex) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'" :color="color.hex" class="mr-2"></v-icon>
                 <span class="text-body-2" :class="{'font-weight-bold': filterStore.selectedColors.includes(color.hex)}">{{ color.name }}</span>
               </div>
            </div>
          </v-col>

        </v-row>
      </div>
    </v-expand-transition>

  </v-container>
</template>

<style scoped>
.text-forest { color: #375A0A !important; }
.bg-forest { background-color: #375A0A !important; }
</style>