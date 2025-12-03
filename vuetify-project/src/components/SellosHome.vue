<script setup>
const sellos = [ 
  {
    title: 'Carbon Neutral',
    img: new URL('@/imgs/CarbonNeutral_Logo.jpg', import.meta.url).href,
  },
  {
    title: 'Fair Trade',
    img: new URL('@/imgs/FSC_Logo.png', import.meta.url).href,
  },
  {
    title: 'EU Ecolabel',
    img: new URL('@/imgs/RainForestAlliance_Logo.png', import.meta.url).href,
  }
]
</script>

<template>
  <v-container class="my-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card flat class="pa-8" color="grey-lighten-5" elevation="4" :class="hover">
          <v-row justify="center" align="center">
            <v-col 
              v-for="sello in sellos" 
              :key="sello.title"
              cols="4"
              md="4"
              class="text-center"
            >
              <div class="sello-circle mx-auto">
                <v-img
                  :src="sello.img"
                  :alt="sello.title"
                  cover
                  class="rounded-circle"
                ></v-img>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.sello-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #375A0A;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.sello-circle:hover {
  transform: scale(1.05);
}

@media (max-width: 960px) {
  .sello-circle {
    width: 90px;
    height: 90px;
  }
}

.sello-circle:hover .v-img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
