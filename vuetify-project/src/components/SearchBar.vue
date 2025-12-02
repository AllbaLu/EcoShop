<script setup>
import { ref, watch } from 'vue'

const search = ref('')

// Emitir eventos
// update:search cuando el usuario escribe (filtrar en tiempo real)
// search-submit cuando el ususario activa la búsqueda
const emit = defineEmits(['update:search', 'search-submit'])

// Se dispara cada vez que cambia el texto
const onInput = (valor) => {
    emit('update:search', valor)
}

// Se dispara con enter o botón
const onSubmit = () => {
    emit('search-submit', search.value)
}

//Mostrar-Ocultar filtros
const filtrosAbiertos = ref(false)
const toggleFiltros = () => {
    filtrosAbiertos.value = !filtrosAbiertos.value
}
</script>

<template>
    <v-container role="search">
        <v-row align="stretch" no-gutters>

            <v-col>
                <v-text-field
                class="search.height"
                v-model="search"
                label="Buscar"
                prepend-inner-icon="mdi-magnify"
                clearable
                variant="outlined"
                density="compact"
                style="height: 3rem;"

                @input="onInput($event.target.value)"
                @keyup.enter="onSubmit"
                />
            </v-col>

            <v-col cols="auto">
                <v-btn
                variant="tonal"
                @click="onSubmit"
                aria-label="Ejecutar búsqueda"
                class="ml-3 search.height"
                >
                Buscar
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn
                    variant="outlined"
                    aria-label="Mostrar filtros"
                    class="ml-3 btn-squared"
                    @click="toggleFiltros"
                >
                <v-icon>mdi-filter-variant</v-icon>
                </v-btn>
                </v-col>
        </v-row> 
        
        <!-- Filtros avanzados -->
    <v-expand-transition>
      <div v-if="filtrosAbiertos" class="mt-3">

        <v-row dense>

          <v-col cols="12" sm="4">
            <v-select
              label="Marca"
              :items="['Marca A', 'Marca B', 'Marca C']"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-select
              label="Tipo de producto"
              :items="['Toner', 'Cartucho', 'Repuesto']"
              variant="outlined"
              density="compact"
            />
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              label="Precio máximo"
              type="number"
              variant="outlined"
              density="compact"
            />
          </v-col>

        </v-row>

      </div>
    </v-expand-transition>

        




    </v-container>
</template>

<style scoped>
.search.height {
    height: 3rem;
}
.btn-squared {
    width: 3rem;
    height: 3rem;
}
</style>