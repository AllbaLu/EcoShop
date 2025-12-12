<script setup>   
import { ref } from 'vue';
import { products } from '@/data/products.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const showDialog = ref(false);
const selectedSelloTitle = ref('');
const filteredProducts = ref([]);

function openRelatedProducts(selloTitle) {
  selectedSelloTitle.value = selloTitle;
  filteredProducts.value = products.value.filter(p => 
    p.certifications && p.certifications.includes(selloTitle)
  );
  showDialog.value = true;
}

function goToProduct(product) {
  // Navegar a la vista de detalle del producto (o abrir modal si prefieres, pero navegación es estándar)
  // Como ProductSection maneja un modal, podríamos navegar a ProductSection con un parámetro, 
  // pero lo más simple es ir a una página de detalle si existe, o simplemente cerrar este modal.
  // Dado que la ruta /product/:id existe en router/index.js:
  router.push({ name: 'ProductDetail', params: { id: product.id } });
}

function formatCLP(value) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}

const props = defineProps({
  //  Define any props if needed in the future
});

const sellos = [ 
  {
    title: 'Climate Neutral Certified',
    subtitle: 'Certificación Empresa Climate Neutral',
    img: new URL('@/imgs/ClimateNeutral_Logo_edit.png', import.meta.url).href,
    description: 'Esta certificación garantiza que la empresa compensa el 100% de sus emisiones de carbono corporativas mediante proyectos verificados de reducción de CO₂. Aplica a toda la operación de la empresa, incluyendo producción, transporte y administración, demostrando un compromiso corporativo con la lucha contra el cambio climático.'
  },
  {
    title: 'Responsibly Sourced Rubber',
    subtitle: 'Caucho de Origen Responsable',
    img: new URL('@/imgs/ResponsiblySourcedRubber_Logo.png', import.meta.url).href,
    description: 'Certifica que el caucho utilizado en los productos proviene de fuentes responsables que protegen el medio ambiente y respetan los derechos laborales de los trabajadores. Promueve prácticas sostenibles en la extracción y procesamiento del caucho, reduciendo deforestación y asegurando trazabilidad en la cadena de suministro.'
  },
  {
    title: 'Cruelty-Free Manufacturing',
    subtitle: 'Fabricación Libre de Crueldad',
    img: new URL('@/imgs/CrueltyFree_Logo.jpg', import.meta.url).href,
    description: 'Los productos con esta certificación aseguran que no se realizaron pruebas en animales en ninguna etapa de desarrollo o fabricación. Promueve prácticas éticas en la industria, garantizando que los ingredientes, fórmulas y productos terminados sean evaluados mediante métodos alternativos respetuosos con la vida animal.'
  },
  {
    title: 'Libre de BPA y PVC',
    subtitle: 'Libre de BPA',
    img: new URL('@/imgs/BPAFree_Logo.png', import.meta.url).href,
    description: 'Esta certificación indica que los productos no contienen bisfenol A (BPA) ni PVC, compuestos que pueden ser perjudiciales para la salud. Garantiza productos seguros para el contacto con alimentos, reduciendo riesgos de contaminación y efectos negativos a largo plazo.'
  },
  {
    title: 'Empaque 100% reciclable',
    subtitle: 'Reciclable',
    img: new URL('@/imgs/Recyclable_Logo.png', import.meta.url).href,
    description: 'Los productos con este sello están diseñados para ser reciclados al final de su vida útil. Promueven la economía circular al permitir que materiales como plástico, papel y cartón sean reprocesados y reutilizados, reduciendo la cantidad de residuos enviados a rellenos sanitarios y minimizando el impacto ambiental.'
  },
  {
    title: 'USDA Biobased Certified',
    subtitle: 'Certificación USDA Biobased',
    img: new URL('@/imgs/USDA_Biobased_Logo_edit.png', import.meta.url).href,
    description: 'Esta certificación indica que el producto está elaborado total o parcialmente con materiales de origen biológico renovable, reduciendo dependencia de recursos fósiles. Garantiza contenido de ingredientes vegetales certificados y fomenta el uso de recursos sostenibles en la fabricación de productos de consumo.'
  },
  {
    title: 'Mineral Natural',
    subtitle: 'Mineral Natural sin tratamientos químicos',
    img: new URL('@/imgs/MineralNatural_Logo.png', import.meta.url).href,
    description: 'Certifica que los productos minerales son 100% naturales y no han sido tratados con químicos sintéticos. Esto asegura seguridad para mascotas y humanos, y reduce impactos ambientales por el uso de sustancias artificiales en su procesamiento.'
  },
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
    <v-row justify="start">
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
            <v-btn 
              color="primary" 
              variant="flat" 
              block 
              class="mb-2"
              @click="openRelatedProducts(sello.title)"
            >
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

  <!-- Modal de Productos Relacionados -->
  <v-dialog v-model="showDialog" max-width="900" scrollable>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center pa-4 bg-primary text-white">
        <span class="text-h6 font-weight-bold text-wrap">
          Productos con certificación: {{ selectedSelloTitle }}
        </span>
        <v-btn icon="mdi-close" variant="text" color="white" @click="showDialog = false"></v-btn>
      </v-card-title>

      <v-card-text class="pa-4 bg-grey-lighten-5">
        <v-container v-if="filteredProducts.length > 0">
          <v-row>
            <v-col
              v-for="product in filteredProducts"
              :key="product.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card 
                flat 
                class="h-100 cursor-pointer product-card-hover" 
                @click="goToProduct(product)"
                elevation="2"
              >
                <v-sheet height="200" class="d-flex align-center justify-center pa-2 position-relative">
                  <img 
                    v-if="!product.image.startsWith('mdi-')" 
                    :src="product.image" 
                    :alt="product.name" 
                    class="w-100 h-100" 
                    style="object-fit: contain;" 
                  />
                  <v-icon v-else :icon="product.image" size="80" color="grey"></v-icon>
                </v-sheet>
                
                <v-card-text class="pt-2">
                  <div class="text-subtitle-1 font-weight-bold text-truncate mb-1">{{ product.name }}</div>
                  <div class="text-h6 text-primary font-weight-bold">{{ formatCLP(product.price) }}</div>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn block color="primary" variant="tonal" size="small">
                    Ver Detalle
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        
        <div v-else class="text-center py-10">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-leaf-off</v-icon>
          <h3 class="text-h6 text-grey-darken-1">No hay productos con este sello por el momento.</h3>
          <p class="text-body-2 text-grey">Estamos trabajando para ampliar nuestro catálogo sostenible.</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

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