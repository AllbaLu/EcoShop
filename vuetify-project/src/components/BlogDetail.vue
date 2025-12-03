<script setup>
import { ref } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

// Ejemplo de estructura del artículo
// {
//   title: 'Título del artículo',
//   subtitle: 'Subtítulo',
//   image: 'URL de imagen',
//   intro: 'Párrafo introductorio en negrita',
//   bodyText: 'Contenido principal separado por \n\n',
//   author: 'Nombre del autor',
//   date: '2024-12-01',
//   source: 'URL',
//   sourceName: 'Nombre de la fuente'
// }

const paragraphs = ref(props.article.bodyText.split('\n\n').filter(p => p.trim()))
</script>

<template>
  <v-container class="blog-detail-container" max-width="900">
    <v-row>
      <v-col cols="12">
        <!-- Imagen destacada -->
        <div class="featured-image-wrapper mb-8">
          <v-img
            :src="article.image"
            height="400px"
            cover
            class="rounded-lg featured-image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>

        <!-- Encabezado del artículo -->
        <div class="article-header mb-6">
          <h1 class="text-h3 font-weight-bold mb-4">
            {{ article.title }}
          </h1>
          
          <h2 class="text-h6 text-grey-darken-1 font-weight-regular mb-6">
            {{ article.subtitle }}
          </h2>

          <!-- Metadata -->
          <div class="article-meta d-flex align-center mb-6">
            <v-chip color="primary" variant="outlined" size="small" class="mr-2">
              <v-icon start icon="mdi-account"></v-icon>
              {{ article.author || 'Equipo EcoShop' }}
            </v-chip>
            <v-chip color="secondary" variant="outlined" size="small">
              <v-icon start icon="mdi-calendar"></v-icon>
              {{ article.date || new Date().toLocaleDateString() }}
            </v-chip>
          </div>

          <v-divider class="mb-6"></v-divider>
        </div>

        <!-- Contenido del artículo -->
        <div class="article-content">
          <!-- Párrafo introductorio en negrita -->
          <p class="text-body-1 font-weight-bold mb-6 intro-paragraph">
            {{ article.intro }}
          </p>

          <!-- Cuerpo del artículo -->
          <div class="article-body">
            <p 
              v-for="(paragraph, index) in paragraphs" 
              :key="index"
              class="text-body-1 mb-4 body-paragraph"
            >
              {{ paragraph }}
            </p>
          </div>

          <!-- Fuente -->
          <v-divider class="my-8"></v-divider>
          
          <div class="article-source">
            <v-card variant="tonal" color="primary" class="pa-4">
              <div class="d-flex align-center">
                <v-icon icon="mdi-link-variant" size="24" class="mr-3"></v-icon>
                <div>
                  <div class="text-caption text-grey-darken-1 mb-1">Fuente</div>
                  <a 
                    :href="article.source" 
                    target="_blank" 
                    class="text-body-2 font-weight-bold source-link"
                  >
                    {{ article.sourceName }}
                    <v-icon icon="mdi-open-in-new" size="16" class="ml-1"></v-icon>
                  </a>
                </div>
              </div>
            </v-card>
          </div>

          <!-- Botones de acción -->
          <div class="article-actions mt-8 d-flex justify-space-between">
            <v-btn 
              variant="outlined" 
              color="primary"
              @click="$router.back()"
              prepend-icon="mdi-arrow-left"
            >
              Volver al Blog
            </v-btn>
            
            <div class="share-buttons">
              <v-btn 
                icon 
                variant="text" 
                color="primary"
                size="small"
              >
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.blog-detail-container {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.featured-image-wrapper {
  position: relative;
}

.featured-image {
  border: 4px solid #375A0A;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.article-header h1 {
  line-height: 1.2;
  color: #1a1a1a;
}

.article-header h2 {
  line-height: 1.4;
}

.article-meta {
  gap: 8px;
}

.intro-paragraph {
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.1rem;
}

.body-paragraph {
  color: #4a5568;
  line-height: 1.8;
  text-align: justify;
  text-justify: inter-word;
}

.source-link {
  color: #375A0A;
  text-decoration: none;
  transition: all 0.2s;
}

.source-link:hover {
  text-decoration: underline;
  color: #2d4808;
}

.article-actions {
  border-top: 1px solid #e0e0e0;
  padding-top: 2rem;
}

@media (max-width: 600px) {
  .featured-image {
    height: 250px !important;
  }
  
  .article-header h1 {
    font-size: 1.75rem !important;
  }
  
  .article-actions {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
