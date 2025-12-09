<script setup>   

const props = defineProps({
  //  Define any props if needed in the future
});

const sellos = [ 
  {
    title: 'Carbon Neutral',
    subtitle: 'Certificación Carbono Neutral',
    img: new URL('@/imgs/CarbonNeutral_Logo.jpg', import.meta.url).href,
    description: 'Los productos certificados como carbono neutral compensan el 100% de sus emisiones de CO₂ a lo largo de su ciclo de vida mediante proyectos verificados de reducción de carbono. Esta certificación garantiza que cada etapa del producto, desde la producción hasta el transporte, ha sido medida y compensada mediante iniciativas de reforestación, energías renovables y proyectos de conservación ambiental que neutralizan el impacto climático.'
  },
  {
    title: 'Fair Trade',
    subtitle: 'Comercio Justo Certificado',
    img: new URL('@/imgs/FairTrade_Logo.png', import.meta.url).href,
    description: 'Fair Trade garantiza precios justos y estables para productores en países en desarrollo, asegurando condiciones laborales dignas, prohibición del trabajo infantil y prácticas comerciales equitativas. Los agricultores y trabajadores reciben una prima adicional que invierten en proyectos comunitarios como educación, salud y mejoras en infraestructura, promoviendo así el desarrollo sostenible de comunidades rurales.'
  },
  {
    title: 'EU Ecolabel',
    subtitle: 'Etiqueta Ecológica Europea',
    img: new URL('@/imgs/EcoLabel_Logo.png', import.meta.url).href,
    description: 'La Etiqueta Ecológica Europea es la certificación oficial de la UE que identifica productos y servicios con un rendimiento ambiental superior durante todo su ciclo de vida. Evalúa criterios estrictos desde la extracción de materias primas, fabricación, distribución hasta el desecho final, garantizando menor consumo energético, reducción de emisiones contaminantes y uso responsable de recursos naturales.'
  },
  {
    title: 'Rainforest Alliance',
    subtitle: 'Certificación Rainforest Alliance',
    img: new URL('@/imgs/RainforestAlliance_Logo.png', import.meta.url).href,
    description: 'Rainforest Alliance promueve la conservación de la biodiversidad, protección de ecosistemas forestales y medios de vida sostenibles para comunidades rurales. Esta certificación asegura prácticas agrícolas y forestales que protegen la vida silvestre, conservan recursos hídricos, reducen el uso de agroquímicos y mejoran las condiciones laborales, creando un equilibrio entre producción responsable y preservación ambiental.'
  },
  {
    title: 'USDA Organic',
    subtitle: 'Certificación Orgánica USDA',
    img: new URL('@/imgs/USDA_orgLogo.jpg', import.meta.url).href,
    description: 'El sello USDA Organic certifica que los productos fueron cultivados sin el uso de pesticidas sintéticos, fertilizantes artificiales, organismos modificados genéticamente (GMO), radiación o lodos de aguas residuales. Los agricultores deben seguir prácticas que preserven la salud del suelo, protejan los recursos hídricos y promuevan la biodiversidad, garantizando alimentos más saludables y respetuosos con el medio ambiente.'
  },
  {
    title: 'FSC',
    subtitle: 'Forest Stewardship Council',
    img: new URL('@/imgs/FSC_Logo.png', import.meta.url).href,
    description: 'FSC certifica que los productos de madera, papel y derivados provienen de bosques gestionados de forma responsable y sostenible. Esta certificación garantiza que la explotación forestal respeta los derechos de pueblos indígenas, protege especies en peligro, mantiene los ecosistemas forestales y asegura la regeneración continua de los bosques, combatiendo la deforestación ilegal y promoviendo la cadena de custodia certificada.'
  }
]
</script>

<template>
  <v-container class="hero-section text-center py-12">
    <h1 class="text-h3 font-weight-bold mb-4">Certificaciones Ecológicas</h1>
    <p class="text-h6 text-grey-darken-1">
      Conoce los sellos que garantizan productos sostenibles y responsables
    </p>
  </v-container>

  <v-container fluid elevation="2" class="pa-4">
    <v-row justify="center">
      <v-col
        v-for="(sello, index) in sellos"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto pa-4 text-center sello-card d-flex flex-column" elevation="8" :hover="true" min-height="600" max-width="450">
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
          
          <v-card-title class="text-h6 text-wrap">{{ sello.title }}</v-card-title>
          <v-card-subtitle class="text-wrap mb-2">{{ sello.subtitle }}</v-card-subtitle>
          <v-card-text class="text-body-2 mb-4 text-justify px-2">{{ sello.description }}</v-card-text>
          
          <v-card-actions class="px-4 pb-4 mt-auto">
            <v-btn color="primary" variant="flat" block class="mb-2">
              Mostrar productos relacionados
            </v-btn>
            <v-btn color="secondary" variant="outlined" block>
              Más información del sello
            </v-btn>
          </v-card-actions>
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

.sello-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
}

.sello-card:hover {
  transform: translateY(-8px);
  
}

.sello-card:hover .sello-image {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

.v-card-title,
.v-card-subtitle {
  word-wrap: break-word;
  white-space: normal !important;
}

.v-card-text {
  flex-grow: 1;
}

.text-justify {
  text-align: justify;
  text-justify: inter-word;
}
</style>