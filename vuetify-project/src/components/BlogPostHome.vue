<script setup>
import { useRouter } from 'vue-router'
import { articulos } from '@/data/blogArticles'

const router = useRouter()

// Solo mostrar los primeros 2 artículos
const articulosFeatured = articulos.slice(0, 2)

function goToDetail(id) {
  console.log('Navegando a artículo:', id)
  router.push({ path: `/blogdetail/${id}` })
}
</script>

<template>
  <v-container class="my-8">
    <v-row>
      <v-col 
        v-for="articulo in articulosFeatured" 
        :key="articulo.id"
        cols="12"
        md="6"
      >
        <v-card 
          @click="goToDetail(articulo.id)" 
          class="hover-card cursor-pointer h-100"
        >
          <div class="pa-4">
            <v-img 
              :src="articulo.image" 
              height="300px" 
              cover
              class="rounded-lg blog-image"
            ></v-img>
          </div>
          <v-card-title class="text-h6 font-weight-bold">{{ articulo.title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-2 mb-2">{{ articulo.subtitle }}</v-card-subtitle>
          <v-card-text>
            <p class="text-body-2"><strong>{{ articulo.intro }}</strong></p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click.stop="goToDetail(articulo.id)" color="primary" variant="text">
              Leer más
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hover-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.hover-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.blog-image {
  border: 3px solid #375A0A;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.hover-card:hover .blog-image {
  transform: scale(1.02);
}
</style>
