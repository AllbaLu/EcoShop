<script setup>
import { ref } from 'vue'
import Hero from '@/components/Hero.vue'
import SearchBar from '@/components/SearchBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
const search = ref('')

</script>

<template>
    <Hero />
    <SearchBar v-model:search="search" />
    <p>Buscando: {{ search }}</p>
</template>