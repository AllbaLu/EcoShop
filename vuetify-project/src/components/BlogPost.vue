<script setup>
const articuloLegislacion = {
  title: 'El fin de la ambigüedad: La Directiva (UE) 2024/825 y el imperativo de la certificación',
  subtitle: 'Análisis del nuevo marco regulatorio europeo contra el "lavado de imagen verde".',
  image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1920&auto=format&fit=crop', // Imagen de Parlamento Europeo/Legislación
  intro: 'La reciente aprobación de la Directiva sobre el empoderamiento de los consumidores para la transición ecológica marca un punto de inflexión: el fin de la autodeclaración ambiental sin prueba empírica.',
  bodyText: `Históricamente, el mercado de productos sostenibles ha sufrido de una profunda "asimetría de información". Los consumidores no tenían herramientas para verificar si un producto etiquetado como "eco-friendly" realmente lo era.
    
    El pasado 28 de febrero de 2024, el Parlamento Europeo aprobó la Directiva 2024/825. Esta normativa prohíbe explícitamente el uso de declaraciones ambientales genéricas (como "natural", "biodegradable" o "eco") si no están respaldadas por un esquema de certificación de excelencia reconocido públicamente, como la **EU Ecolabel**.
    
    Para nuestra e-shop, esto valida nuestro modelo de negocio: la certificación no es un lujo, es la única prueba de cumplimiento normativo y rigor científico. El sello Ecolabel garantiza que el impacto ambiental se ha reducido en todo el ciclo de vida del producto, no solo en su disposición final.`,
  source: 'https://www.europarl.europa.eu/news/es/press-room/20240112IPR16772/el-pe-adopta-una-ley-que-prohibe-el-blanqueo-ecologico',
  sourceName: 'Parlamento Europeo - Notas de Prensa (2024)'
};
const articuloEconomia = {
  title: 'Mecanismos de estabilización de precios en mercados volátiles: El caso Fairtrade',
  subtitle: 'Cómo el "Precio Mínimo Fairtrade" actúa como red de seguridad macroeconómica.',
  image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1920&auto=format&fit=crop', // Imagen de cultivo de café/granos
  intro: 'En la economía agrícola global, la volatilidad de precios de los "commodities" perpetúa ciclos de pobreza. Analizamos cómo la certificación Fair Trade interviene en esta dinámica de mercado.',
  bodyText: `La teoría económica convencional sugiere que los precios deben fluctuar libremente según la oferta y la demanda. Sin embargo, para los pequeños productores del sur global, una caída abrupta en el precio del café o el cacao puede significar la insolvencia inmediata y el abandono de tierras.
    
    La certificación **Fairtrade** introduce un instrumento económico vital: el "Precio Mínimo Fairtrade". Según estudios de impacto de la Universidad de Harvard y reportes de la Fairtrade Foundation, este mecanismo actúa como un suelo financiero que cubre los costos medios de producción sostenible.
    
    Más allá del precio, la "Prima Fairtrade" (un monto adicional pagado por encima del precio de venta) se invierte democráticamente en infraestructura comunitaria y productividad. Al adquirir productos con este sello en nuestra tienda, el consumidor no está haciendo una donación, está participando en un sistema de comercio que corrige fallos de mercado estructurales y fomenta la resiliencia económica.`,
  source: 'https://www.fairtrade.net/impact/research-and-evaluation',
  sourceName: 'Fairtrade International - Impact Research & Evaluation'
};

const articuloForestal = {
  title: 'Trazabilidad de la Cadena de Custodia: El estándar FSC frente a la tala ilegal',
  subtitle: 'La importancia de la certificación forestal en la preservación de la biodiversidad y los sumideros de carbono.',
  image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1920&auto=format&fit=crop',
  intro: 'La madera y el papel son recursos renovables, teóricamente. Sin embargo, sin una cadena de custodia auditada, su consumo contribuye directamente a la degradación de los ecosistemas críticos.',
  bodyText: `El Consejo de Administración Forestal (FSC) no solo se preocupa por los árboles, sino por la integridad del ecosistema. Su certificación se basa en 10 principios rigurosos que deben cumplirse para obtener el sello. El punto crítico es la "Cadena de Custodia" (CoC).
    
    La CoC asegura la trazabilidad completa desde el bosque hasta el consumidor final. Esto es vital para evitar la entrada de madera ilegal en el mercado legal. Según informes de WWF, la tala ilegal representa un porcentaje alarmante del comercio mundial de madera, destruyendo hábitats de especies en peligro y liberando toneladas de CO2 almacenado.
    
    Al exigir el sello **FSC 100%** o **FSC Recycled**, garantizamos que la extracción de recursos mantiene la biodiversidad, la productividad y los procesos ecológicos del bosque. No es solo madera; es la garantía científica de que el bosque seguirá existiendo para las futuras generaciones.`,
  source: 'https://fsc.org/en/what-the-fsc-labels-mean',
  sourceName: 'Forest Stewardship Council (FSC) - Technical Standards'
};

</script>



<template>
  <v-container class="my-8">
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <!-- Artículo Legislación -->
        <v-card class="mb-8 hover-card" elevation="8">
          <div class="pa-4">
            <v-img 
              :src="articuloLegislacion.image" 
              height="350px" 
              cover
              class="rounded-lg blog-image"
            ></v-img>
          </div>
          <v-card-title class="text-h5 font-weight-bold">{{ articuloLegislacion.title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1 mb-2">{{ articuloLegislacion.subtitle }}</v-card-subtitle>
          <v-card-text>
            <p><strong>{{ articuloLegislacion.intro }}</strong></p>
            <p v-for="(paragraph, index) in articuloLegislacion.bodyText.split('\n\n')" :key="index">{{ paragraph }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn :href="articuloLegislacion.source" target="_blank" text color="primary">
              Leer más en {{ articuloLegislacion.sourceName }}
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Artículo Economía -->
        <v-card class="mb-8 hover-card" elevation="8">
          <div class="pa-4">
            <v-img 
              :src="articuloEconomia.image" 
              height="350px" 
              cover
              class="rounded-lg blog-image"
            ></v-img>
          </div>
          <v-card-title class="text-h5 font-weight-bold">{{ articuloEconomia.title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1 mb-2">{{ articuloEconomia.subtitle }}</v-card-subtitle>
          <v-card-text>
            <p><strong>{{ articuloEconomia.intro }}</strong></p>
            <p v-for="(paragraph, index) in articuloEconomia.bodyText.split('\n\n')" :key="index">{{ paragraph }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn :href="articuloEconomia.source" target="_blank" text color="primary">
              Leer más en {{ articuloEconomia.sourceName }}
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Artículo Forestal -->
        <v-card class="mb-8 hover-card" elevation="8">
          <div class="pa-4">
            <v-img 
              :src="articuloForestal.image" 
              height="350px" 
              cover
              class="rounded-lg blog-image"
            ></v-img>
          </div>
          <v-card-title class="text-h5 font-weight-bold">{{ articuloForestal.title }}</v-card-title>
          <v-card-subtitle class="text-subtitle-1 mb-2">{{ articuloForestal.subtitle }}</v-card-subtitle>
          <v-card-text>
            <p><strong>{{ articuloForestal.intro }}</strong></p>
            <p v-for="(paragraph, index) in articuloForestal.bodyText.split('\n\n')" :key="index">{{ paragraph }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn :href="articuloForestal.source" target="_blank" text color="primary">
              Leer más en {{ articuloForestal.sourceName }}
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hover-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.hover-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.blog-image {
  border: 3px solid #375A0A;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.hover-card:hover .blog-image {
  transform: scale(1.02);
}
</style>
