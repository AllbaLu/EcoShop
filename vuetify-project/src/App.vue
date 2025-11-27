<script setup>
  import Navbar from './components/Navbar.vue'
  import SiteFooter from './components/SiteFooter.vue'
  import BlogPost from './components/BlogPost.vue';
  import { router } from './router/index.js';
  
</script>

<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <SiteFooter />
  </v-app>
</template>
