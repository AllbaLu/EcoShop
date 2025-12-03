<script setup>

//Importa store del carrito
import { useCartStore } from '@/stores/useCartStore'
const cart = useCartStore()

</script>

<template>
  <v-app-bar app color="white" dark>
    <v-toolbar-title>&lt;ECO_SHOP&gt; &lt;En prueba aún&gt;</v-toolbar-title>
    <v-spacer />
    <v-btn text class="bg-white" :to="{ name: 'homeview' }">Inicio</v-btn>
    <v-btn text class="bg-white" :to="{ name: 'sellosview' }">Sellos</v-btn>
    <v-btn text class="bg-white" :to="{ name: 'blogview' }">Blog</v-btn>
    <v-btn text class="bg-white" :to="{ name: 'productsectionview'}">Catálogo Productos</v-btn>
    <v-btn text class="bg-white">Contacto</v-btn>

    <v-btn
    class="bg-white"
    @click="cart.open = true"
    >

    <v-badge
    :content="cart.items.length"
    color="accent"
    v-if="cart.items.length > 0"
    offset-x="4"
    offset-y="4"
    >
    <template #badge></template>
    <v-icon>mdi-cart</v-icon>
    </v-badge>

    <v-icon v-else class="mr-2">mdi-cart</v-icon>
    CARRITO
    </v-btn>

    <v-btn outlined class="bg-secondary">Log in</v-btn>
    <v-btn class="bg-secondary">Register</v-btn>
  </v-app-bar>
</template>



<style scoped>
.v-btn {
  margin-left: 8px;
}
.v-btn:hover {
  background-color: #ffeb3b ; /* Cambia a un color amarillo brillante al pasar el cursor */
  color: #000000 ; /* Cambia el color del texto al pasar el cursor */
}
</style>
