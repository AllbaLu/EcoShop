<script setup>
import { ref } from 'vue'
import Hero from '@/components/Hero.vue'
import SearchBar from '@/components/SearchBar.vue'
import ProductCarousel from '@/components/ProductCarousel.vue'
import BlogPostHome from '@/components/BlogPostHome.vue'
import SellosHome from '@/components/SellosHome.vue'

const search = ref('')
</script>

<template>
  <!-- Hero Carousel -->
  <Hero />
  
  <!-- Search Bar -->
  <SearchBar v-model:search="search" />
  
  <!-- Products Section -->
  <v-container class="my-8">
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-2 text-center">Productos Destacados</h2>
        <p class="text-subtitle-1 text-grey-darken-1 text-center mb-8">
          Descubre nuestra selección de productos sostenibles y certificados
        </p>
      </v-col>
    </v-row>
  </v-container>
  <ProductCarousel />
  
  <!-- Blog Section -->
  <v-container class="my-12">
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-2 text-center">Últimas Noticias</h2>
        <p class="text-subtitle-1 text-grey-darken-1 text-center mb-8">
          Mantente informado sobre sostenibilidad y comercio justo
        </p>
      </v-col>
    </v-row>
  </v-container>
  <BlogPostHome />
  
  <!-- Certifications Section -->
  <v-container class="my-12">
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-2 text-center">Nuestras Certificaciones</h2>
        <p class="text-subtitle-1 text-grey-darken-1 text-center mb-8">
          Compromiso verificado con el medio ambiente y la responsabilidad social
        </p>
      </v-col>
    </v-row>
  </v-container>
  <SellosHome />
</template>