import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore('filter', () => {
  // Estado (Las mismas variables que tenías en ProductSection)
  const searchQuery = ref('');
  const priceRange = ref([0, 150]);
  const selectedTags = ref([]);
  const selectedSizes = ref([]);
  const selectedColors = ref([]);
  const sortOption = ref("new");
  const productToOpen = ref(null);

  // Acción para limpiar filtros (opcional, útil para el botón "Limpiar")
  function resetFilters() {
    searchQuery.value = '';
    priceRange.value = [0, 150];
    selectedTags.value = [];
    selectedSizes.value = [];
    selectedColors.value = [];
  }

  return {
    searchQuery,
    priceRange,
    selectedTags,
    selectedSizes,
    selectedColors,
    sortOption,
    productToOpen,
    resetFilters
  };
});