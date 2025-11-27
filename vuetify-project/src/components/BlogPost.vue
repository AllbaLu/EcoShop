<script setup>
const noticias = {
  title: 'Título del Blog',
  subtitle: 'Subtítulo del Blog',
  intro: 'Esta es una introducción al blog post que proporciona un resumen breve del contenido.',
  bodyText: `Aquí va el contenido principal del blog post. Puedes escribir varios párrafos para desarrollar el tema en profundidad. 
  Asegúrate de incluir información relevante y atractiva para mantener el interés de los lectores.`
};


</script>



<template>
<v-row class="mb-12"> <v-col cols="12" md="4">
      <v-img
        src="https://cdn.pixabay.com/photo/2016/04/21/22/02/aerial-view-1344591_1280.jpg" 
        cover
        class="bg-grey-lighten-2 rounded-lg hover-card cursor-pointer mb-4 mx-12 my-6"
        aspect-ratio="1.5"
      ></v-img>
    </v-col>

    <v-col cols="12" md="8">
      <h3 class="text-h5 font-weight-bold mb-2 mx-0 my-6">{{ noticias.title }}</h3>
      <div class="text-subtitle-1 text-grey-darken-1 mb-4 my-6">{{ noticias.subtitle }}</div>
      
      <p class="text-body-1 text-grey-darken-3 mb-4">
        {{ noticias.intro }}
      </p>
      
      <p class="text-body-2 text-grey-darken-1">
        {{ noticias.bodyText }}
      </p>
    </v-col>
  </v-row>

</template>

<style>
.hover-card:hover {
  transform: scale(1.02);
  transition: transform 0.5s;
}

.cursor-pointer {
  cursor: pointer;
}


</style>
