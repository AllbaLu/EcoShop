<script setup>
import { ref } from 'vue';

</script>

<template>
   <v-hover><template #default="{ hover }">
    <v-footer app padless elevation=15 class="footer" color="white"
    :class="{ 'on-hover': isHovering }"
          :elevation="isHovering ? 16 : 2">
        <v-col class="text-center" cols="12">
        <v-img src="https://via.placeholder.com/150x50" contain height="50" placeholder="Logo"> Aquí va el logo ♫ 
        </v-img>
        &copy; {{ new Date().getFullYear() }} - All rights reserved.
        </v-col>
    </v-footer>
   </v-hover>
</template>



<style scoped>
.footer:hover{
    background-color: #ffeb3b ; /* Cambia a un color amarillo brillante al pasar el cursor */
    color: #000000 ; /* Cambia el color del texto al pasar el cursor */
  }
</style>