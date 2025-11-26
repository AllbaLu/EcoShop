<script setup>
  import Navbar from './components/Navbar.vue'
  import SiteFooter from './components/SiteFooter.vue'
  import BlogPost from './components/BlogPost.vue';
</script>

<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
      <BlogPost />
    </v-main>
    <SiteFooter />
  </v-app>
</template>
