<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Datos simulados del producto
const product = ref({
  title: "Text Heading",
  price: 50,
  tag: "Tag",
  shortDescription: "Text description placeholder.",
  imagePlaceholder: "mdi-image-outline",
  // Datos para el acordeón
  detailsTitle: "Title",
  detailsContent: "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.",
  // Datos para las reseñas
  reviews: [
    { id: 1, title: "Review title", body: "Review body", user: "Reviewer name", date: "Date", rating: 5, avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, title: "Review title", body: "Review body", user: "Reviewer name", date: "Date", rating: 4, avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, title: "Review title", body: "Review body", user: "Reviewer name", date: "Date", rating: 5, avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  ]
});

// Variables para los selectores
const selectedOption1 = ref('Value');
const selectedOption2 = ref('Value');
const options = ['Value', 'Option 2', 'Option 3'];
</script>

<template>
  <v-container class="py-12">
    
    <v-row class="mb-16">
      
      <v-col cols="12" md="6">
        <v-sheet 
          color="grey-lighten-3" 
          class="rounded-lg d-flex align-center justify-center position-relative" 
          height="500"
        >
          <v-btn icon="mdi-heart" variant="flat" color="grey-darken-4" class="position-absolute top-0 left-0 ma-4 text-white" size="small"></v-btn>
          <v-icon icon="mdi-image-outline" size="150" color="grey-lighten-1"></v-icon>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6" class="pl-md-10">
        
        <h1 class="text-h4 font-weight-bold mb-2">{{ product.title }}</h1>
        
        <div class="d-flex align-center mb-4">
          <v-chip color="green-lighten-4" class="text-green-darken-3 font-weight-bold mr-3 rounded" size="small" label>
            {{ product.tag }}
          </v-chip>
          <span class="text-h4 font-weight-bold">${{ product.price }}</span>
        </div>

        <p class="text-body-1 text-grey-darken-1 mb-6">{{ product.shortDescription }}</p>

        <v-row class="mb-2">
          <v-col cols="6">
            <div class="text-caption font-weight-bold mb-1">Label</div>
            <v-select
              v-model="selectedOption1"
              :items="options"
              variant="outlined"
              density="compact"
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="6">
            <div class="text-caption font-weight-bold mb-1">Label</div>
            <v-select
              v-model="selectedOption2"
              :items="options"
              variant="outlined"
              density="compact"
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <v-btn 
          block 
          color="grey-darken-4" 
          size="large" 
          class="text-none mb-6 rounded" 
          flat
        >
          Button
        </v-btn>

        <v-expansion-panels variant="outlined" class="rounded">
          <v-expansion-panel elevation="0">
            <v-expansion-panel-title class="font-weight-bold text-body-2">
              {{ product.detailsTitle }}
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-grey-darken-1">
              {{ product.detailsContent }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

      </v-col>
    </v-row>

    <div class="mb-16">
      <h3 class="text-h5 font-weight-bold mb-6">Latest reviews</h3>
      
      <v-row>
        <v-col cols="12" md="4" v-for="review in product.reviews" :key="review.id">
          <v-card variant="outlined" class="h-100 rounded-lg pa-4">
            
            <div class="d-flex mb-2">
              <v-icon 
                v-for="n in 5" 
                :key="n" 
                :icon="n <= review.rating ? 'mdi-star' : 'mdi-star-outline'" 
                size="small" 
                class="mr-1"
              ></v-icon>
            </div>

            <div class="text-subtitle-1 font-weight-bold mb-1">{{ review.title }}</div>
            <div class="text-body-2 text-grey-darken-1 mb-4">{{ review.body }}</div>

            <div class="d-flex align-center mt-auto">
              <v-avatar size="32" class="mr-3">
                <v-img :src="review.avatar" cover></v-img>
              </v-avatar>
              <div>
                <div class="text-caption font-weight-bold">{{ review.user }}</div>
                <div class="text-caption text-grey">{{ review.date }}</div>
              </div>
            </div>

          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="text-center max-width-600 mx-auto">
      <h3 class="text-h6 font-weight-bold mb-1">Follow the latest trends</h3>
      <p class="text-body-2 text-grey mb-4">With our daily newsletter</p>
      
      <div class="d-flex gap-2 justify-center" style="max-width: 400px; margin: 0 auto;">
        <v-text-field 
          placeholder="you@example.com" 
          variant="outlined" 
          density="compact" 
          hide-details
          class="flex-grow-1"
        ></v-text-field>
        <v-btn color="grey-darken-4" class="text-none" flat>Submit</v-btn>
      </div>
    </div>

  </v-container>
</template>

<style scoped>
/* Ajuste para que el contenedor del newsletter no sea demasiado ancho */
.max-width-600 {
  max-width: 600px;
}
</style>