<script setup>
import { ref } from 'vue';
</script>

<template>
  <v-footer
    app 
    padless 
    color="white"
    class="footer-hover"
    elevation="2">
    <v-col class="text-center" cols="12">
      <v-img 
        src="https://via.placeholder.com/150x50" 
        contain 
        height="50" 
        placeholder="Logo"
      >
      </v-img>
      <div>&copy; {{ new Date().getFullYear() }} My Company</div>
    </v-col>
  </v-footer>
</template>

<style scoped>
.footer-hover {
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.footer-hover:hover {
  box-shadow: 0 16px 60px rgba(0, 0, 0, 0.3) !important;
  transform: translateY(-4px);
}
</style>