<script setup>
import { useCartStore } from '@/stores/useCartStore'
const cart = useCartStore()
</script>

<template>
    <v-navigation-drawer location="right" v-model="cart.open" width="380" temporary class="elevation-10">

        <v-toolbar flat>
            <v-toolbar-title>CARRITO</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn icon @click="cart.open = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list>
            <v-list-item v-for="(item, index) in cart.items" :key="item.id">

                <template #prepend>
                    <v-img :src="item.image" height="50" cover class="mr-1 rounded-lg" />
                </template>

                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>$ {{ item.price.toFixed(2) }}</v-list-item-subtitle>

                <template #append>
                    <div class="d-flex align-center ga-2">
                        <v-btn icon size="x-small" density="comfortable" @click="cart.decrease(index)">
                            <v-icon size="18">mdi-minus</v-icon>
                        </v-btn>

                        <span>{{ item.quantity }}</span>

                        <v-btn icon size="x-small" density="comfortable" @click="cart.increase(index)">
                            <v-icon size="18">mdi-plus</v-icon>
                        </v-btn>

                        <v-btn icon size="x-small" density="comfortable" @click="cart.removeItem(index)">
                            <v-icon color="info">mdi-delete</v-icon>
                        </v-btn>
                    </div>
                </template>
            </v-list-item>
        </v-list>

        <v-divider class="my-4"></v-divider>

        <div class="px-4 text-h6">
            Total: $ {{ cart.total.toFixed(2) }}
        </div>

        <div class="text-center">
        <v-btn color="accent" class="btn-cart mt-4">
            Finalizar compra
        </v-btn>
        </div>


    </v-navigation-drawer>

</template>

<style scoped>
.btn-cart {
    width: 50%;
}



</style>