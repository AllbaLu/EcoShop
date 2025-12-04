<script setup>
  import Navbar from './components/Navbar.vue'
  import CartDrawer from './components/CartDrawer.vue'
  import Footer from './components/Footer.vue'
  import BlogPost from './components/BlogPost.vue';
</script>

<template>
  <v-app>
    <Navbar />
    <CartDrawer />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>
