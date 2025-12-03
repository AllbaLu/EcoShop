<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '@/components/Footer.vue';
import BlogPost from '@/components/BlogPost.vue';
import BlogDetail from '@/components/BlogDetail.vue';

const route = useRoute();
const article = ref(null);

onMounted(() => {
  const articleId = route.params.id;
  // Aquí deberías hacer una llamada a una API o buscar en tus datos locales
  // para obtener el artículo basado en el articleId.
  // Por simplicidad, usaremos un objeto simulado.
    article.value = {
        id: articleId,
        title: 'Título del artículo ' + articleId,
        content: 'Contenido del artículo ' + articleId,
    };
});
</script>

<template>
  <v-container>
    <BlogDetail v-if="article" :article="article" />
    <Footer />
  </v-container>
</template>

<style scoped>
</style>