<script setup>   

const props = defineProps({
  //  Define any props if needed in the future
});

const sellos = [ 
  {
    title: 'Carbon Neutral',
    subtitle: 'Certificación Carbono Neutral',
    img: new URL('@/imgs/V1.png', import.meta.url).href,
    description: 'Productos certificados como carbono neutral compensan el 100% de sus emisiones de CO₂ mediante proyectos de reducción de carbono verificados.'
  },
  {
    title: 'Fair Trade',
    subtitle: 'Comercio Justo Certificado',
    img: new URL('@/imgs/V2.jpg', import.meta.url).href,
    description: 'Garantiza precios justos para productores, condiciones laborales dignas y prácticas comerciales equitativas en países en desarrollo.'
  },
  {
    title: 'EU Ecolabel',
    subtitle: 'Etiqueta Ecológica Europea',
    img: new URL('@/imgs/V3.jpg', import.meta.url).href,
    description: 'Certificación oficial de la UE que identifica productos con menor impacto ambiental durante todo su ciclo de vida.'
  },
  {
    title: 'Rainforest Alliance',
    subtitle: 'Certificación Rainforest Alliance',
    img: new URL('@/imgs/RainforestAlliance_Logo.png', import.meta.url).href,
    description: 'Promueve la conservación de la biodiversidad y medios de vida sostenibles mediante prácticas agrícolas y forestales responsables.'
  },
  {
    title: 'USDA Organic',
    subtitle: 'Certificación Orgánica USDA',
    img: new URL('@/imgs/USDA_orgLogo.png', import.meta.url).href,
    description: 'Garantiza que los productos fueron cultivados sin pesticidas sintéticos, fertilizantes artificiales ni organismos modificados genéticamente.'
  },
  {
    title: 'FSC',
    subtitle: 'Forest Stewardship Council',
    img: new URL('@/imgs/V2.jpg', import.meta.url).href,
    description: 'Certifica que los productos de madera y papel provienen de bosques gestionados de forma responsable y sostenible.'
  }
]
</script>

<template>
  <v-container fluid elevation="2" class="pa-4">
    <v-row justify="center">
      <v-col
        v-for="(sello, index) in sellos"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <v-card class="mx-auto pa-4 text-center" elevation="8" :hover="true">
          <!-- Imagen circular -->
          <div class="d-flex justify-center mb-4">
            <div class="sello-image">
              <v-img
                :src="sello.img"
                :alt="sello.title"
                cover
              ></v-img>
            </div>
          </div>
          
          <v-card-title class="text-h6">{{ sello.title }}</v-card-title>
          <v-card-subtitle>{{ sello.subtitle }}</v-card-subtitle>
          <v-card-text>{{ sello.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.sello-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #375A0A;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.sello-image .v-img {
  width: 100%;
  height: 100%;
}

.v-card:hover .sello-image {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>