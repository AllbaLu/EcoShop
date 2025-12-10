<template>
  <div>
    <Navbar />
    <v-container class="mt-8">
      <h1>Detalle del Producto</h1>
      <p>ID: {{ $route.params.id }}</p>
      <!-- Aquí puedes agregar más detalles del producto -->
    </v-container>
    <SiteFooter />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>
