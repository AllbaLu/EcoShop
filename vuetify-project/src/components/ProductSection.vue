<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import api from '@/api';
import { useFilterStore } from '@/stores/useFilterStore';
import { useRouter } from 'vue-router';
import sellos from '@/data/certifications.js'
import { products as sharedProducts } from '@/data/products.js';
import EcoBadge from '@/components/EcoBadge.vue'
const router = useRouter();

const cart = useCartStore();
const filterStore = useFilterStore();

// --- 1. VARIABLES DE BÚSQUEDA Y FILTROS ---
const showFilters = ref(false); // Mostrar/Ocultar panel de filtros

// Filtros
const sortOption = ref("new");

// Variables del Modal
const showProductDialog = ref(false);
const selectedProduct = ref(null);

// --- 2. DATOS ESTÁTICOS ---
const availableTags = [
  "Alimentación", "Aseo/Higiene", "Arena", "Bolsas/Desechos",
  "Gatos", "Juguetes", "Limpieza/Hogar", "Mascotas", "Orgánico",
  "Paseos", "Perros", "Salud/Bienestar", "Utensilios"
];

// Mapeo de colores (Nombre -> Hexadecimal que usas en ecoBadges)
const filterColors = [
  { name: "Verde Oscuro", hex: "#375A0A" },
  { name: "Lima", hex: "#E6EB51" },
  { name: "Negro", hex: "#010101" },
  { name: "Blanco", hex: "#F1FFFF" },
  { name: "Celeste", hex: "#C8E8FF" }
  // Agrega más si tus productos tienen otros colores en 'ecoBadges'
];

// --- 3. DATOS DE PRODUCTOS ---
// Productos de ejemplo (fallback)
const productsStatic = [
  {
    id: 1,
    name: "Pelota Fetch",
    price: 7990,
    rating: 3.5,
    image: new URL('@/assets/productos/becopets1.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Juguetes",
      "Perros",
      "Salud/Bienestar",
    ],

    description: `Pelota compatible con lanzadores, en colores brillantes. 
    Segura para los dientes al atraparla, hecha de caucho natural suave y elástico. 
    Tiene un agujero en el centro para un juego más seguro (y silba cuando vuela). 
    Los colores brillantes la hacen más fácil de ver entre el pasto alto.`,

    materials: {
      composition: {
        caucho_natural: 54,
        caucho_sintetico: 11,
        otros: "pigmentos seguros sin ftalatos ni BPA"
      },
      renewable_percent: 54,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Beco Pets",
      brand_country: "Reino Unido",
      manufactured_in: "Asia (fábricas supervisadas)",
      url: "https://www.becopets.com/products/natural-rubber-fetch-ball"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.4 - 0.8",
        transport: "0.1 - 0.3",
        total_estimated: "0.5 - 1.1"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        caucho_natural: "parcial",
        caucho_sintetico: "no biodegradable"
      }
    },

    certifications: [
      "Climate Neutral Certified",
      "Responsibly Sourced Rubber",
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],
  },

  {
    id: 2,
    name: "Slinger Pebble",
    price: 12990,
    rating: 4.5, // juego interactivo muy valorado
    image: new URL('@/assets/productos/becopets2.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Juguetes",
      "Perros",
      "Salud/Bienestar",
    ],

    description: `Huevo con cuerda para lanzar, buscar y tirar. 
  Su forma es segura para los dientes y la cuerda permite alcanzar 
  mayor distancia en cada lanzamiento. Ideal para juegos dinámicos y 
  entrenamientos.`,

    materials: {
      composition: {
        caucho_natural: 54,
        caucho_sintetico: 11,
        cuerda_rPET: "poliéster reciclado",
        otros: "pigmentos seguros"
      },
      renewable_percent: 54,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Beco Pets",
      brand_country: "Reino Unido",
      manufactured_in: "Asia (fábricas supervisadas)",
      url: "https://www.becopets.com/products/natural-rubber-pebble-slinger-toy?variant=44410784055548"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.3 - 0.6",
        transport: "0.1 - 0.2",
        total_estimated: "0.4 - 0.8"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        caucho_natural: "parcial",
        cuerda_rPET: "reciclable"
      }
    },

    certifications: [
      "Climate Neutral Certified",
      "Responsibly Sourced Rubber",
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },

  {
    id: 3,
    name: "Treat Bone",
    price: 10990,
    rating: 5.0, // excelente para masticadores fuertes
    image: new URL('@/assets/productos/becopets3.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

      tags: [
      "Juguetes",
      "Perros",
      "Salud/Bienestar",
    ],

    description: `Juguete resistente para masticadores intensos. 
  Cuenta con aberturas en ambos extremos para insertar premios y 
  estimular el juego interactivo. Fabricado con caucho natural suave 
  pero muy duradero.`,

    materials: {
      composition: {
        caucho_natural: 54,
        caucho_sintetico: 11,
        otros: "pigmentos seguros"
      },
      renewable_percent: 54,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Beco Pets",
      brand_country: "Reino Unido",
      manufactured_in: "Asia (fábricas supervisadas)",
      url: "https://www.becopets.com/products/natural-rubber-chew-bone?variant=44410787234044"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.4 - 0.7",
        transport: "0.1 - 0.2",
        total_estimated: "0.5 - 0.9"
      },
      sustainability_level: "🌿 Medio impacto",
      durability: "Muy alta",
      biodegradability: {
        caucho_natural: "parcial"
      }
    },

    certifications: [
      "Climate Neutral Certified",
      "Responsibly Sourced Rubber",
      "Libre de BPA y PVC"
    ]
  },

  {
    id: 4,
    name: "Arena para gatitos",
    price: 6990,
    rating: 4.5,
    image: new URL('@/assets/productos/sanicat1.png', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Arena",
      "Gatos",
      "Aseo/Higiene",
    ],

    description: `Arena de sepiolita natural con fragancia suave de valeriana 
  diseñada especialmente para gatitos. Gránulos finos, casi sin polvo y 
  gentiles con las patas sensibles. Facilita el adiestramiento en el uso 
  de la caja de arena.`,

    materials: {
      composition: {
        sepiolita_natural: 100
      },
      renewable_percent: 0,
      recyclable: false,
      biodegradable: false
    },

    origin: {
      brand: "Sanicat",
      brand_country: "Europa",
      manufactured_in: "España",
      url: "https://www.sanicat.com/es/producto/mejor-arena-gatitos/"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.1 - 0.2",
        transport: "0.05",
        total_estimated: "0.15 - 0.25"
      },
      sustainability_level: "🌍 Impacto medio por extracción mineral",
      durability: "N/A (consumible)",
    },

    certifications: [
      "Mineral Natural",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },

  {
    id: 5,
    name: "Arena para gatos Advanced Hygiene sin fragancia",
    price: 6990,
    rating: 4.0,
    image: new URL('@/assets/productos/sanicat2.jpg', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

     tags: [
      "Arena",
      "Gatos",
      "Aseo/Higiene",
    ],

    description: `Arena absorbente de diatomita natural con control de olores 
  hasta tres veces más eficiente que las no aglomerantes convencionales. 
  Ideal para hogares que buscan menor mantenimiento.`,

    materials: {
      composition: {
        diatomita_natural: 100
      },
      renewable_percent: 0,
      recyclable: false,
      biodegradable: false
    },

    origin: {
      brand: "Sanicat",
      brand_country: "Europa",
      manufactured_in: "España",
      url: "https://www.sanicat.com/es/producto/arena-para-gatos-advanced-hygiene-sin-fragancia/"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.1 - 0.2",
        transport: "0.05",
        total_estimated: "0.15 - 0.25"
      },
      sustainability_level: "🌍 Impacto medio por extracción mineral"
    },

    certifications: ["Reciclable"],

    recommendations: [2, 3]
  },

  {
    id: 6,
    name: "Sanicat Diamonds - Aroma Aloe Vera",
    price: 5990,
    rating: 4.3,
    image: new URL('@/assets/productos/sanicat3.png', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

      tags: [
      "Arena",
      "Gatos",
      "Aseo/Higiene",
    ],

    description: `Arena de gel de sílice con aroma a aloe vera. 
  Altamente absorbente y diseñada para quienes no pueden limpiar la 
  bandeja de arena con frecuencia. Mantiene la bandeja seca y controlada.`,

    materials: {
      composition: {
        gel_silice: 100
      },
      renewable_percent: 0,
      recyclable: false,
      biodegradable: false
    },

    origin: {
      brand: "Sanicat",
      brand_country: "Europa",
      manufactured_in: "España",
      url: "https://www.sanicat.com/es/producto/diamonds-aloe-vera/"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.2 - 0.3",
        transport: "0.05",
        total_estimated: "0.25 - 0.35"
      },
      sustainability_level: "🌍 Impacto medio-alto por gel de sílice"
    },

    certifications: ["Reciclable"],

    recommendations: [2, 3]
  },

  {
    id: 7,
    name: "Lima de uñas de diamante Safari",
    price: 6200,
    rating: 4.5,
    image: new URL('@/assets/productos/iherb1.avif', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

      tags: [
      "Perros",
      "Aseo/Higiene",
    ],

    description: `Lima con superficie de diamante diseñada para dar un acabado 
  suave y seguro a las uñas de tu mascota. Ideal para mantener uñas saludables 
  entre cortes.`,

    materials: {
      composition: {
        acero: "estructura",
        recubrimiento_diamante: "superficie abrasiva"
      },
      recyclable: "parcial"
    },

    origin: {
      brand: "Safari",
      brand_country: "EE.UU.",
      manufactured_in: "Asia",
      url: "https://cl.iherb.com/pr/safari-diamond-nail-file-1-count/105847"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "Impacto bajo-medio"
    },

    recommendations: [2, 3]
  },

  {
    id: 8,
    name: "Cortauñas de acero inoxidable Safari",
    price: 9400,
    rating: 4.5,
    image: new URL('@/assets/productos/iherb2.avif', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

      tags: [
      "Perros",
      "Aseo/Higiene",
    ],

    description: `Cortauñas de acero inoxidable con tope de seguridad. 
  Corta con precisión y durabilidad, ideal para perros pequeños.`,

    materials: {
      composition: {
        acero_inoxidable: 100
      },
      recyclable: "sí"
    },

    origin: {
      brand: "Safari",
      brand_country: "EE.UU.",
      manufactured_in: "Asia",
      url: "https://cl.iherb.com/pr/safari-stainless-steel-nail-trimmer-small-dogs-1-tool/105844"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "Impacto bajo"
    },

    recommendations: [2, 3]
  },

  {
    id: 9,
    name: "Cepillo suave y liso Safari",
    price: 9400,
    rating: 4.5,
    image: new URL('@/assets/productos/iherb3.avif', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

      tags: [
      "Perros",
      "Aseo/Higiene",
    ],

    description: `Cepillo suave para perros medianos. Elimina enredos, 
  pelo suelto y ayuda a mantener un pelaje sano con uso regular.`,

    materials: {
      composition: {
        mango_plastico: "duradero",
        puntas_protegidas: "para comodidad",
        cerdas_metal: "efectivas para desenredar"
      },
      recyclable: "parcial"
    },

    origin: {
      brand: "Safari",
      brand_country: "EE.UU.",
      manufactured_in: "Asia",
      url: "https://cl.iherb.com/pr/safari-soft-slicker-brush-for-medium-dogs-1-brush/98950"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "Impacto medio"
    },

    recommendations: [2, 3]
  },

  {
    id: 10,
    name: "Ecos - Quitamanchas y quita olores, limón",
    price: 10300,
    rating: 4.6,
    image: new URL('@/assets/productos/iherb4.avif', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Mascotas",
      "Limpieza/Hogar",
    ],

    description: `Quitamanchas con enzimas activas, eficaz incluso en manchas 
  difíciles. Elimina olores desde su origen y no requiere enjuague. 
  Fragancia natural a limón.`,

    materials: {
      composition: {
        enzimas: "biodegradables",
        base_agua: true,
        fragancia_limon: "origen natural"
      },
      biodegradable: true
    },

    origin: {
      brand: "ECOS",
      brand_country: "EE.UU.",
      manufactured_in: "EE.UU.",
      url: "https://cl.iherb.com/pr/earth-friendly-products-ecos-stain-odor-remover-lemon-22-fl-oz-650-ml/110629"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "Impacto bajo"
    },

    recommendations: [2, 3]
  },

  {
    id: 11,
    name: "Earth Rated - Bolsas para desechos de perros, sin fragancia",
    price: 10300,
    rating: 4.6,
    image: new URL('@/assets/productos/iherb5.avif', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Perros",
      "Bolsas/Desechos",
      "Paseos"
    ],

    description: `Bolsas extrafuertes y extralargas (9x13”). 
  100% a prueba de fugas. Presentación económica con 270 bolsas.`,

    materials: {
      composition: {
        film_ecologico: "sin fragancia"
      },
      recyclable: "empaque"
    },

    origin: {
      brand: "Earth Rated",
      brand_country: "Canadá",
      manufactured_in: "China",
      url: "https://cl.iherb.com/pr/earth-rated-dog-poop-bags-unscented-270-bags/104298"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "Impacto medio"
    },

    recommendations: [2, 3]
  },

  {
    id: 12,
    name: "Peanuts - Bolsas para desechos de perros, Naranja",
    price: 10300,
    rating: 4.6,
    image: new URL('@/assets/productos/iherb6.avif', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Perros",
      "Bolsas/Desechos",
      "Paseos"
    ],

    description: `Paquete de repuesto contiene 120 bolsas BioBased en 8 rollos con 15 bolsas cada uno. 
  Las bolsas son gruesas, a prueba de fugas y retienen agua más de 7 días.`,

    materials: {
      composition: {
        bolsas_ecologicas: "BioBased"
      },
      renewable_percent: 38,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Peanuts",
      brand_country: "EE.UU.",
      manufactured_in: "China",
      url: "https://cl.iherb.com/pr/original-poop-bags-peanuts-orange-8-rolls-15-bags-each/154138"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.1 - 0.2",
        transport: "0.1",
        total_estimated: "0.2 - 0.3"
      },
      sustainability_level: "🌿 Medio impacto",
      durability: "Alta",
      biodegradability: {
        bolsas_ecologicas: "parcial"
      }
    },

    certifications: [
      "USDA Biobased Certified",
      "Libre de BPA",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 13,
    name: "Peanuts - Dispensador de bolsas, Verde",
    price: 6600,
    rating: 4.6,
    image: new URL('@/assets/productos/iherb7.avif', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Perros",
      "Bolsas/Desechos",
      "Paseos"
    ],

    description: `Dispensador de base biológica certificado USDA (38%), elaborado con recursos renovables. 
  Reduce impacto ambiental y de salud.`,

    materials: {
      composition: {
        base_biologica: "38%",
        plastico_reciclable: true
      },
      renewable_percent: 38,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Peanuts",
      brand_country: "EE.UU.",
      manufactured_in: "China",
      url: "https://cl.iherb.com/pr/original-poop-bags-peanuts-bag-dispenser-green-snoopy-bags-unscented-1-dispenser-15-bags/154137"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.1",
        transport: "0.1",
        total_estimated: "0.2"
      },
      sustainability_level: "🌿 Medio impacto",
      durability: "Alta",
      biodegradability: {
        base_biologica: "parcial"
      }
    },

    certifications: [
      "USDA Biobased Certified",
      "Libre de BPA",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 14,
    name: "Super Beef",
    price: 10390,
    rating: 4.9,
    image: new URL('@/assets/productos/stellas1.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Alimentación",
      "Perros",
      "Orgánico"
    ],

    description: `Alimento de carne roja de alta calidad, libre de antibióticos y hormonas. 
  Incluye hígado, riñón, corazón, panza y hueso de res, así como frutas y verduras orgánicas. 
  Comida completa, equilibrada y nutritiva.`,

    materials: {
      composition: {
        carne_res: 50,
        organos: 30,
        frutas_verduras: 20
      },
      renewable_percent: 50,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Stella & Chewy's",
      brand_country: "EE.UU.",
      manufactured_in: "EE.UU.",
      url: "https://www.onlynaturalpet.com/products/stella-chewys-raw-dinners-freeze-dried-dog-food?variant=29783184736320"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.3 - 0.5",
        transport: "0.1 - 0.2",
        total_estimated: "0.4 - 0.7"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        carne_res: "no biodegradable",
        frutas_verduras: "parcial"
      }
    },

    certifications: [
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 15,
    name: "Alimento Seco para Perros con Granos Ancestrales",
    price: 44990,
    rating: 4.9,
    image: new URL('@/assets/productos/stellas2.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Alimentación",
      "Perros",
      "Salud/Bienestar"
    ],

    description: `Alimento seco con granos ancestrales: cebada perlada, avena, arroz integral y mijo. 
  Proteínas responsables y suplementos como glucosamina, condroitina y taurina para salud articular y cardiovascular.`,

    materials: {
      composition: {
        carnes: "fuentes responsables",
        granos_ancestrales: ["cebada perlada", "avena", "arroz integral", "mijo"]
      },
      renewable_percent: 50,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Stella & Chewy's",
      brand_country: "EE.UU.",
      manufactured_in: "EE.UU.",
      url: "https://www.onlynaturalpet.com/products/stella-chewys-essentials-ancient-grain-dry-dog-food?variant=39393111638052"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.4 - 0.6",
        transport: "0.1 - 0.2",
        total_estimated: "0.5 - 0.8"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        granos_ancestrales: "parcial"
      }
    },

    certifications: [
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 16,
    name: "Toppers Liofilizados para Perros",
    price: 14990,
    rating: 4.9,
    image: new URL('@/assets/productos/stellas3.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

     tags: [
      "Alimentación",
      "Perros",
      "Salud/Bienestar"
    ],

    description: `Bocados liofilizados libres de granos y gluten. Proteínas de res, aves libres y pescado salvaje. 
  Mezcla con croquetas, probióticos y frutas/verduras antioxidantes.`,

    materials: {
      composition: {
        carne_res: "alimentada con pasto",
        aves: "libres",
        pescado: "salvaje",
        frutas_verduras: "ricas en antioxidantes",
        probioticos: true
      },
      renewable_percent: 50,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Stella & Chewy's",
      brand_country: "EE.UU.",
      manufactured_in: "EE.UU.",
      url: "https://www.onlynaturalpet.com/products/stella-chewys-freeze-dried-meal-mixers-dog-food-toppers?variant=29297455333440"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.3 - 0.5",
        transport: "0.1 - 0.2",
        total_estimated: "0.4 - 0.7"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        carne_res: "no biodegradable",
        frutas_verduras: "parcial"
      }
    },

    certifications: [
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 17,
    name: "Alimento Seco Crudo para Gatos",
    price: 33990,
    rating: 4.7,
    image: new URL('@/assets/productos/stellas4.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Alimentación",
      "Perros",
      "Salud/Bienestar"
    ],

    description: `Alimento seco para gatos con pollo y aves criadas en libertad. 
    Croquetas recubiertas con materia cruda liofilizada. Enriquecido con taurina y 
    probióticos, libre de papa, granos y soya.`,

    materials: {
      composition: {
        pollo: "libre",
        aves: "libres",
        probioticos: true,
        taurina: true
      },
      renewable_percent: 50,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Stella & Chewy's",
      brand_country: "EE.UU.",
      manufactured_in: "EE.UU.",
      url: "https://www.onlynaturalpet.com/products/stella-chewy-raw-blend-dry-cat-food?variant=32135492272164"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.3 - 0.5",
        transport: "0.1 - 0.2",
        total_estimated: "0.4 - 0.7"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        pollo: "parcial"
      }
    },

    certifications: [
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 18,
    name: "Alimento Liofilizado sin Granos para Gatos – Conejo",
    price: 13990,
    rating: 4.9,
    image: new URL('@/assets/productos/stellas5.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

     tags: [
      "Alimentación",
      "Gatos",
      "Salud/Bienestar",
    ],

    description: `Cena liofilizada para gatos, sin granos, elaborada con carne de conejo cruda y natural. 
  Sin hormonas, antibióticos, conservantes, colorantes, azúcar o sal añadida. Contiene taurina.`,

    materials: {
      composition: {
        carne_conejo: "cruda y natural",
        taurina: true
      },
      renewable_percent: 50,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Stella & Chewy's",
      brand_country: "EE.UU.",
      manufactured_in: "EE.UU.",
      url: "https://www.onlynaturalpet.com/products/stella-chewys-grain-free-freeze-dried-cat-food?variant=29297452679232"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.3 - 0.5",
        transport: "0.1 - 0.2",
        total_estimated: "0.4 - 0.7"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        carne_conejo: "parcial"
      }
    },

    certifications: [
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 19,
    name: "Alimento Húmedo Desmenuzado para Gatos – Pollo y Res",
    price: 27990,
    rating: 5.0,
    image: new URL('@/assets/productos/stellas6.webp', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Alimentación",
      "Gatos",
      "Salud/Bienestar",
    ],


    description: `Alimento húmedo con pollo y res desmenuzada en ligero caldo. Rico en proteínas animales y bajo en carbohidratos, con taurina añadida. Proteínas de fuentes responsables: pollo criado en libertad y res alimentada con pasto. Libre de granos, legumbres, papas, carragenina, trigo, subproductos cárnicos, soya, colorantes y conservantes.`,

    materials: {
      composition: {
        pollo: "libre",
        res: "alimentada con pasto",
        taurina: true
      },
      renewable_percent: 50,
      recyclable: "parcial",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Stella & Chewy's",
      brand_country: "EE.UU.",
      manufactured_in: "EE.UU.",
      url: "https://www.onlynaturalpet.com/products/stella-chewys-carnivore-cravings-savory-shreds-chicken-beef-wet-cat-food?variant=40297120759844"
    },

    environment: {
      carbon_footprint_kgCO2e: {
        production: "0.3 - 0.5",
        transport: "0.1 - 0.2",
        total_estimated: "0.4 - 0.7"
      },
      sustainability_level: "🌿 Medio-bajo impacto",
      durability: "Alta",
      biodegradability: {
        pollo: "parcial",
        res: "parcial"
      }
    },

    certifications: [
      "Cruelty-Free Manufacturing",
      "Libre de BPA y PVC",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },

  {
    id: 20,
    name: "Tazón Gusto 1,300 ml Aquarelle",
    price: 21000,
    rating: 4.6,
    image: new URL('@/assets/productos/moderna1.jpeg', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Alimentación",
      "Utensilios",
      "Perros",
    ],

    description: `Tazón fácil de sujetar con bordes redondeados y base estable para evitar vuelcos. 
  Apto para lavavajillas y elaborado con más del 98% de plástico reciclado.`,

    materials: {
      composition: {
        plastico_reciclado: "98%"
      },
      renewable_percent: 98,
      recyclable: "total",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Moderna",
      brand_country: "EE.UU.",
      manufactured_in: "China",
      url: "https://www.modernaproducts.com/international/product/4095/gusto-large"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "🌿 Medio impacto",
      durability: "Alta",
      biodegradability: {
        plastico_reciclado: "parcial"
      }
    },

    certifications: [
      "Libre de BPA",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 21,
    name: "Tazón Sensibowl 2x700ml Verde Oliva",
    price: 22000,
    rating: 4.6,
    image: new URL('@/assets/productos/moderna2.jpeg', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Alimentación",
      "Utensilios",
      "Perros",
    ],

    description: `Tazones elegantes con exterior mate y interior brillante. 
    Pies de goma antideslizantes, apilables, aptos para lavavajillas y fabricados con 
    plástico premium libre de BPA y 100% reciclable.`,

    materials: {
      composition: {
        plastico_premium: true,
        goma_antideslizante: true
      },
      renewable_percent: 90,
      recyclable: "total",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Moderna",
      brand_country: "EE.UU.",
      manufactured_in: "China",
      url: "https://www.modernaproducts.com/international/product/70321/sensibowl-2x700ml"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "🌿 Medio impacto",
      durability: "Alta",
      biodegradability: {
        plastico_premium: "parcial"
      }
    },

    certifications: [
      "Libre de BPA",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 22,
    name: "Dispensador Smart Sancker Jumbo 1,300 ml Verde Claro",
    price: 30000,
    rating: 4.3,
    image: new URL('@/assets/productos/moderna3.jpeg', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

    tags: [
      "Alimentación",
      "Utensilios",
      "Perros",
    ],

    description: `Dispensador de comida por gravedad con base estable y tapa de fácil llenado. 
    Plástico transparente para ver el alimento restante. Apto para lavavajillas y 100% reciclable.`,

    materials: {
      composition: {
        plastico_transparente: true
      },
      renewable_percent: 90,
      recyclable: "total",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Moderna",
      brand_country: "EE.UU.",
      manufactured_in: "China",
      url: "https://www.modernaproducts.com/international/product/68523/smart-snacker-jumbo"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "🌿 Medio impacto",
      durability: "Alta",
      biodegradability: {
        plastico_transparente: "parcial"
      }
    },

    certifications: [
      "Libre de BPA",
      "Reciclable"
    ],

    recommendations: [2, 3]
  },
  {
    id: 23,
    name: "Caja de Arena Smart Cat Coral",
    price: 27000,
    rating: 4.7,
    image: new URL('@/assets/productos/moderna4.jpeg', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

      tags: [
      "Arena",
      "Gatos",
      "Aseo/Higiene",
    ],


    description: `Caja de arena con bandeja profunda y puerta translúcida. Bordes redondeados, 
    asa de transporte y filtro de carbón. Fabricada con >90% material reciclado y completamente reciclable.`,

    materials: {
      composition: {
        plastico_reciclado: "90%"
      },
      renewable_percent: 90,
      recyclable: "total",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Moderna",
      brand_country: "EE.UU.",
      manufactured_in: "China",
      url: "https://www.modernaproducts.com/international/product/8128/smart-cat"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "🌿 Medio impacto",
      durability: "Alta",
      biodegradability: {
        plastico_reciclado: "parcial"
      }
    },

    certifications: [
      "Reciclable",
      "Libre de BPA"
    ],

    recommendations: [2, 3]
  },
  {
    id: 24,
    name: "Rejilla Scoopy Pequeña Azul Marino",
    price: 14000,
    rating: 4.2,
    image: new URL('@/assets/productos/moderna5.jpeg', import.meta.url).href,

    ecoBadges: ["#375A0A", "#E6EB51"],

      tags: [
      "Arena",
      "Gatos",
      "Aseo/Higiene",
      "Utensilios"
    ],


    description: `Rejilla para facilitar limpieza diaria, prolonga duración de la arena y evita malos olores. 
    Fabricada con plástico premium y 100% reciclable.`,

    materials: {
      composition: {
        plastico_premium: true
      },
      renewable_percent: 90,
      recyclable: "total",
      bpa_free: true,
      phthalate_free: true,
      latex_warning: false
    },

    origin: {
      brand: "Moderna",
      brand_country: "EE.UU.",
      manufactured_in: "China",
      url: "https://www.modernaproducts.com/international/product/3983/scoopy-small-grid"
    },

    environment: {
      carbon_footprint_kgCO2e: "0.2",
      sustainability_level: "🌿 Medio impacto",
      durability: "Alta",
      biodegradability: {
        plastico_premium: "parcial"
      }
    },

    certifications: [
      "Reciclable",
      "Libre de BPA"
    ],

    recommendations: [2, 3]
  }
];

// Productos dinámicos desde el backend
const products = ref([]);
const loading = ref(false);
const error = ref('');

// Paginación (máximo 15 por página)
const page = ref(1);
const perPage = 15;

// Formateo CLP sin decimales
function formatCLP(value) {
  try {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  } catch {
    return `$${Math.round(Number(value) || 0).toLocaleString('es-CL')}`;
  }
}

// Cargar productos desde el backend y combinarlos con los estáticos
async function loadProducts() {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await api.get('/products');
    // Combinar productos estáticos con los del backend
    // Los productos del backend tendrán IDs mayores a 1000 para evitar conflictos
    const productsFromDB = response.data || [];
    
    // Ajustar IDs de los productos del backend para evitar conflictos
    const adjustedDBProducts = productsFromDB.map(p => ({
      ...p,
      id: p.id + 1000 // Offset para evitar conflictos con productos estáticos
    }));
    
    // Combinar ambos arrays: estáticos primero, luego los de BD
    products.value = [...sharedProducts.value, ...adjustedDBProducts];
    
    console.log('Productos cargados:', products.value.length, 'total');
    console.log('- Estáticos:', sharedProducts.value.length);
    console.log('- Base de datos:', productsFromDB.length);
  } catch (err) {
    // En caso de error, usar solo productos estáticos
    error.value = 'Usando solo productos de ejemplo (error al conectar con BD)';
    console.log('Error al cargar productos del backend, usando solo estáticos:', err);
    products.value = sharedProducts.value;
  } finally {
    loading.value = false;
  }
}

// Cargar productos al montar el componente
onMounted(() => {
  loadProducts();
});

// --- 4. LÓGICA DE FILTRADO AVANZADA ---
const filteredProducts = computed(() => {
  let result = products.value.filter(p => {
    
    // Usamos filterStore.variable
    const matchSearch = p.name.toLowerCase().includes(filterStore.searchQuery.toLowerCase());
    const matchPrice = p.price >= filterStore.priceRange[0] && p.price <= filterStore.priceRange[1];
    
    const matchSize = filterStore.selectedSizes.length === 0 || 
                      (p.sizes && p.sizes.some(s => filterStore.selectedSizes.includes(s)));
    
    const matchTags = filterStore.selectedTags.length === 0 || 
                      (p.tags && p.tags.some(t => filterStore.selectedTags.includes(t)));
    
    const matchColor = filterStore.selectedColors.length === 0 || 
                       (p.ecoBadges && p.ecoBadges.some(c => filterStore.selectedColors.includes(c)));

    return matchSearch && matchPrice && matchSize && matchTags && matchColor;
  });

  // Ordenamiento
  if (filterStore.sortOption === 'asc') result.sort((a, b) => a.price - b.price);
  else if (filterStore.sortOption === 'desc') result.sort((a, b) => b.price - a.price);
  else if (filterStore.sortOption === 'rating') result.sort((a, b) => b.rating - a.rating);
  else result.sort((a, b) => b.id - a.id);

  return result;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)));
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage;
  return filteredProducts.value.slice(start, start + perPage);
});

onMounted(() => {
  if (filterStore.productToOpen) {
    selectedProduct.value = filterStore.productToOpen;
    showProductDialog.value = true;
    filterStore.productToOpen = null;
  }
});

// --- FUNCIONES ---
// Formatea claves como "caucho_natural" → "Caucho Natural"
const formatMaterialKey = (key) => {
  if (!key) return '';
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// Abrir detalle en modal
const openProductDetail = (p) => { selectedProduct.value = p; showProductDialog.value = true; };

// Añadir al carrito
const addToCart = (p) => {
  const item = p || selectedProduct.value;
  if (item) { cart.addItem({ ...item }); if (showProductDialog.value) showProductDialog.value = false; }
};

// Recomendaciones
const getRecommendations = (product) => {
  if (!product) return [];
  
  // Filter out the current product
  let candidates = products.value.filter(p => p.id !== product.id);
  
  // Calculate score based on matching tags
  const scored = candidates.map(p => {
    let score = 0;
    if (product.tags && p.tags) {
      const intersection = p.tags.filter(t => product.tags.includes(t));
      score = intersection.length;
    }
    // Boost if category/type matches (heuristic: first tag often indicates category)
    if (product.tags?.[0] && p.tags?.[0] === product.tags[0]) {
      score += 1;
    }
    return { product: p, score };
  });
  
  // Sort by score desc
  scored.sort((a, b) => b.score - a.score);
  
  // Take top 4
  return scored.slice(0, 4).map(item => item.product);
};

// SELLOS CERTIFICACIONES

// Devuelve la imagen del sello según el nombre de la certificación
function getSelloImg(certName) {
  const sello = sellos.find(s => s.title === certName || s.subtitle === certName);
  return sello ? sello.img : '';
}

// Devuelve el título del sello
function getSelloTitle(certName) {
  const sello = sellos.find(s => s.title === certName || s.subtitle === certName);
  return sello ? sello.title : certName;
}

// Devuelve descripción resumida (máx 100 caracteres)
function getSelloShortDesc(certName) {
  const sello = sellos.find(s => s.title === certName || s.subtitle === certName);
  return sello ? sello.description : '';
}

// Ir a sellos certificaciones
function goToSellos() {
  router.push({ name: 'sellosview' });
}
</script>




<template>
  <v-container fluid class="bg-white py-8">
    <!-- Indicador de carga -->
    <v-row v-if="loading" class="justify-center my-8">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4">Cargando productos...</p>
      </v-col>
    </v-row>

    <!-- Mensaje de error -->
    <v-alert v-if="error" type="warning" class="mb-4">
      {{ error }}. Mostrando productos de ejemplo.
    </v-alert>

    <v-row v-if="!loading">
      <!-- Removed broken code block -->
    </v-row>
  </v-container>
  <v-container fluid class="bg-white py-8" theme="light">
    <v-row align="center" class="mb-6">

      <v-col>
        <v-text-field v-model="filterStore.searchQuery" label="Buscar productos sostenibles..."
          prepend-inner-icon="mdi-magnify" clearable variant="outlined" density="compact" hide-details rounded="pill" />
      </v-col>

      <v-col cols="auto">
        <v-btn variant="tonal" height="40" class="px-6" rounded="pill" aria-label="Buscar productos">
          Buscar
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn variant="outlined" height="40" width="40" class="pa-0" rounded="circle"
          @click="showFilters = !showFilters" :color="showFilters ? 'forest' : ''"
          aria-label="Mostrar u ocultar filtros" role="button">
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12" md="auto" class="d-flex justify-end mt-3 mt-md-0">
        <v-btn-toggle v-model="filterStore.sortOption" mandatory density="compact" variant="text" class="sort-toggle"
          role="radiogroup" aria-label="Ordenar productos por criterio">
          <v-btn value="new" class="sort-btn" size="small">Nuevo</v-btn>
          <v-btn value="asc" class="sort-btn" size="small">Precio Asc</v-btn>
          <v-btn value="desc" class="sort-btn" size="small">Precio Desc</v-btn>
          <v-btn value="rating" class="sort-btn" size="small">Calif.</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div v-if="showFilters" class="mb-8 pa-4 bg-grey-lighten-5 rounded-lg border">
        <v-row>

          <v-col cols="12" md="4">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Etiquetas</h4>
            <v-chip-group v-model="filterStore.selectedTags" column multiple>
              <v-chip v-for="tag in availableTags" :key="tag" :value="tag" filter variant="outlined" size="small"
                color="forest">{{ tag }}</v-chip>
            </v-chip-group>
          </v-col>

          <v-col cols="12" md="3">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Rango de Precio</h4>
            <div class="text-caption mb-1">{{ formatCLP(filterStore.priceRange[0]) }} - {{ formatCLP(filterStore.priceRange[1]) }}</div>
            <v-range-slider v-model="filterStore.priceRange" max="100000" min="0" step="500" thumb-size="14"
              track-color="grey-lighten-2" track-fill-color="forest" thumb-color="forest" hide-details></v-range-slider>
          </v-col>


          <!-- NO APLICADO PORQUE NO HAY PRODUCTOS CON ESTAR CARACTERÍSTICAS TODAVÍA-->
           <!--

          <v-col cols="12" md="2">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Tamaño</h4>
            <div class="d-flex flex-column">
              <v-checkbox v-model="filterStore.selectedSizes" label="Chico (S)" value="S" density="compact" hide-details
                color="forest" class="mt-0 pt-0"></v-checkbox>
              <v-checkbox v-model="filterStore.selectedSizes" label="Mediano (M)" value="M" density="compact"
                hide-details color="forest" class="mt-0 pt-0"></v-checkbox>
              <v-checkbox v-model="filterStore.selectedSizes" label="Grande (L)" value="L" density="compact"
                hide-details color="forest" class="mt-0 pt-0"></v-checkbox>
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <h4 class="text-subtitle-2 font-weight-bold mb-2">Colores</h4>
            <div class="d-flex flex-wrap gap-2">
              <div v-for="(color, index) in filterColors" :key="index"
                class="d-flex align-center mr-4 mb-2 cursor-pointer"
                @click="filterStore.selectedColors.includes(color.hex) ? filterStore.selectedColors = filterStore.selectedColors.filter(c => c !== color.hex) : filterStore.selectedColors.push(color.hex)">
                <v-icon
                  :icon="filterStore.selectedColors.includes(color.hex) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                  :color="color.hex" class="mr-2"></v-icon>
                <span class="text-body-2"
                  :class="{ 'font-weight-bold': filterStore.selectedColors.includes(color.hex) }">{{
                  color.name }}</span>
              </div>
            </div>
          </v-col>

          -->

        </v-row>
      </div>
    </v-expand-transition>

    <!-- LISTADO DE CARDS -->
    <v-row>
      <v-col v-for="product in paginatedProducts" :key="product.id" cols="12" sm="6" md="4" lg="4" xl="4">
        <v-card flat class="product-card cursor-pointer h-100 d-flex flex-column" @click="openProductDetail(product)"
          role="button" tabindex="0" :aria-label="`Ver detalles del producto ${product.name}`">
          <v-sheet color="grey-lighten-4" height="280"
            class="d-flex align-center justify-center mb-3 rounded-lg position-relative overflow hidden">
            <img v-if="!product.image.startsWith('mdi-')" :src="product.image"
              :alt="`Imagen del producto ${product.name}`" class="w-100 h-100" style="object-fit: cover;" />
            <v-icon v-else :icon="product.image" size="80" color="grey-lighten-1"></v-icon>
            <v-btn icon="mdi-heart-outline" variant="text" size="small"
              class="position-absolute top-0 right-0 ma-2"></v-btn>
          </v-sheet>

          <div class="px-1 pb-2 flex-grow-1">
            <div class="text-body-1 font-weight-medium text-truncate">{{ product.name }}</div>
            <div class="d-flex justify-space-between align-center mt-2">
              <span class="text-body-2 font-weight-bold">{{ formatCLP(product.price) }}</span>
              <div class="d-flex align-center">
                <EcoBadge :badges="product.ecoBadges" />
              </div>
            </div>
            <!-- accesible: texto oculto con tags/eco info para lectores de pantalla -->
            <span class="sr-only">Eco: {{ (product.tags || []).slice(0,3).join(', ') }}</span>
          </div>

          <v-btn block variant="tonal" color="forest" size="small" class="mt-2 text-none"
            @click.stop="addToCart(product)" :aria-label="`Añadir ${product.name} al carrito`" role="button">
            <v-icon start icon="mdi-cart-plus"></v-icon> Añadir
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="filteredProducts.length === 0">
      <v-col class="text-center py-10 text-grey">
        No se encontraron productos con esos filtros.
      </v-col>
    </v-row>

    <!-- Paginación -->
    <v-row v-if="filteredProducts.length > 0">
      <v-col cols="12" class="d-flex justify-center mt-6">
        <v-pagination v-model="page" :length="totalPages" rounded density="comfortable" color="forest" />
      </v-col>
    </v-row>

    <!-- DIALOG / MODAL -->
    <v-dialog v-model="showProductDialog" max-width="900" scrollable>
      <v-card v-show="selectedProduct" class="rounded-lg bg-white" role="dialog"
        :aria-label="`Detalle del producto ${selectedProduct.name}`">
        <div class="d-flex justify-end pa-2">
          <v-btn icon="mdi-close" variant="text" @click="showProductDialog = false"
            aria-label="Cerrar detalle del producto" role="button">
          </v-btn>
        </div>

        <v-card-text class="pa-0">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-sheet color="grey-lighten-4" height="400"
                  class="d-flex align-center justify-center rounded-lg overflow-hidden">
                  <img :src="selectedProduct.image" :alt="`Imagen del producto ${selectedProduct.name}`"
                    class="w-100 h-100" style="object-fit: cover;" />
                </v-sheet>
              </v-col>

              <!-- Nombre producto -->
              <v-col cols="12" md="6" class="pl-md-6">
                <h2 class="text-h4 font-weight-bold text-forest mb-2">{{ selectedProduct.name }}</h2>

                <!-- Precio + Rating -->
                <div class="d-flex align-center mb-4">
                  <span class="text-h5 font-weight-medium mr-4">{{ formatCLP(selectedProduct.price) }}</span>
                  <v-rating :model-value="selectedProduct.rating" color="amber" density="compact" half-increments
                    readonly size="small"></v-rating>
                  <span class="text-caption text-grey ml-2">({{ selectedProduct.rating }})</span>
                </div>

                <!-- Descripción -->
                <p class="text-body-1 text-grey-darken-2 mb-6">{{ selectedProduct.description || 'Sin descripción.' }}
                </p>

                <v-divider class="mb-4"></v-divider>

                <!-- Datos técnicos: Materiales (formato limpio) -->
                <div class="mb-2">
                  <strong class="text-forest">Materiales:</strong>
                  <div class="text-body-2 ml-2"
                    v-if="selectedProduct.materials && selectedProduct.materials.composition">
                    <ul>
                      <li v-for="(val, key) in selectedProduct.materials.composition" :key="key">
                        {{ formatMaterialKey(key) }}: {{ val }}{{ typeof val === 'number' ? '%' : '' }}
                      </li>
                    </ul>
                    <div>Renovable: {{ selectedProduct.materials.renewable_percent || 'N/A' }}%</div>
                    <div>Reciclable: {{ selectedProduct.materials.recyclable || 'N/A' }}</div>
                    <div v-if="selectedProduct.materials.bpa_free">Libre de BPA</div>
                    <div v-if="selectedProduct.materials.phthalate_free">Libre de ftalatos</div>
                  </div>
                  <div v-else class="text-body-2 ml-2">{{ selectedProduct.materials || 'N/A' }}</div>
                </div>

                <!-- Origen / Marca -->
                <div class="mb-2">
                  <strong class="text-forest">Origen:</strong>
                  <span class="text-body-2 ml-2">
                    {{ selectedProduct.origin?.brand_country || 'N/A' }}
                  </span>
                </div>

                <div class="mb-2">
                  <strong class="text-forest">Marca:</strong>
                  <span class="text-body-2 ml-2">
                    <a v-if="selectedProduct.origin?.url" :href="selectedProduct.origin.url" target="_blank"
                      rel="noopener" class="text-forest text-decoration-underline"
                      :aria-label="`Abrir página de ${selectedProduct.origin?.brand}`">
                      {{ selectedProduct.origin?.brand || selectedProduct.origin?.name || 'Ver marca' }}
                    </a>
                    <span v-else>{{ selectedProduct.origin?.brand || 'N/A' }}</span>
                  </span>
                </div>

                <!-- Ambiental -->
                <div class="mb-4">
                  <strong class="text-forest">Ambiental</strong>
                  <div class="text-body-2 ml-2">
                    <div><strong>Huella de carbono (kg CO₂e):</strong>
                      <div v-if="selectedProduct.environment?.carbon_footprint_kgCO2e">
                        Producción: {{ selectedProduct.environment.carbon_footprint_kgCO2e.production || 'N/A' }},
                        Transporte: {{ selectedProduct.environment.carbon_footprint_kgCO2e.transport || 'N/A' }},
                        Total (estimado): {{ selectedProduct.environment.carbon_footprint_kgCO2e.total_estimated ||
                        'N/A' }}
                      </div>
                      <div v-else>N/D</div>
                    </div>

                    <div><strong>Nivel de sostenibilidad:</strong> {{ selectedProduct.environment?.sustainability_level
                      || 'N/A' }}</div>
                    <div><strong>Biodegradabilidad:</strong>
                      <div v-if="selectedProduct.environment?.biodegradability">
                        <div v-for="(v, k) in selectedProduct.environment.biodegradability" :key="k">
                          {{ formatMaterialKey(k) }}: {{ v }}
                        </div>
                      </div>
                      <div v-else>N/D</div>
                    </div>
                    <div><strong>Durabilidad:</strong> {{ selectedProduct.environment?.durability || 'N/A' }}</div>
                  </div>
                </div>

                <!-- Certificaciones -->
                <div class="mb-4">
                  <strong class="text-forest">Certificaciones</strong>
                  <div class="d-flex flex-wrap ml-2 mt-2" v-if="selectedProduct.certifications?.length">
                    <v-tooltip v-for="(c, idx) in selectedProduct.certifications" :key="idx" top max-width="300">
                      <template #activator="{ props }">
                        <div
                        class="certificado-icon-wrapper mr-2 mb-2"
                        v-bind="props"
                        @click="goToSellos(c)"
                        role="button"
                        :aria-label="`Ver información del sello ${c}`"
                        >
                        <v-img 
                        :src="getSelloImg(c)"
                        :alt="c"
                        cover
                        ></v-img>
                        </div>
                      </template>
                      <template #default>
                        <div class="tooltip-content">
                          <strong>{{ getSelloTitle(c) }}</strong>
                          <p class="mb-0 text-caption">{{ getSelloShortDesc(c) }}</p>
                        </div>
                      </template>
                    </v-tooltip>
                  </div>
                  <div v-else class="text-body-2 ml-2">N/D</div>




                  <!--
                  <ul class="text-body-2 ml-2" v-if="selectedProduct.certifications?.length">
                    <li v-for="(c, idx) in selectedProduct.certifications" :key="idx">{{ c }}</li>
                  </ul>
                  <div v-else class="text-body-2 ml-2">N/D</div>
                  -->
                </div>

                <v-btn block color="forest" size="large" rounded="pill" class="mb-4 text-none bg-forest text-white"
                  @click="addToCart()" :aria-label="`Añadir ${selectedProduct.name} al carrito desde el modal`"
                  role="button">
                  Añadir al Carrito
                </v-btn>

              </v-col>
            </v-row>

            <!-- Recomendaciones -->



            <v-row class="mt-8" v-if="getRecommendations(selectedProduct).length">
              <v-col cols="12">
                <h3 class="text-h6 font-weight-bold mb-4">También te podría interesar</h3>
              </v-col>
              <v-col v-for="recProd in getRecommendations(selectedProduct)" :key="recProd.id" cols="6"
                md="3">
                <v-card flat class="bg-grey-lighten-5 cursor-pointer pa-2" @click="openProductDetail(recProd)"
                  role="button" :aria-label="`Ver detalles del producto recomendado ${recProd.name}`">
                  <v-sheet height="80" color="transparent" class="d-flex align-center justify-center mb-2 overflow-hidden rounded">
                    <img v-if="recProd.image && !recProd.image.startsWith('mdi-')" :src="recProd.image" :alt="recProd.name" class="w-100 h-100" style="object-fit: cover;">
                    <v-icon v-else :icon="recProd.image || 'mdi-package-variant'" size="40" color="grey"></v-icon>
                  </v-sheet>
                  <div class="text-caption font-weight-bold text-truncate">{{ recProd.name }}</div>
                  <div class="text-caption text-forest">{{ formatCLP(recProd.price) }}</div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<style scoped>
.text-forest {
  color: #375A0A !important;
}

.bg-forest {
  background-color: #375A0A !important;
}

.sort-toggle .v-btn--active {
  background-color: #010101 !important;
  color: white !important;
}

.product-card:hover .v-sheet {
  background-color: #E6EB51 !important;
  transition: background-color 0.3s ease;
}

.product-card:hover .v-icon {
  color: #375A0A !important;
}

.cursor-pointer {
  cursor: pointer;
}

.border-icon {
  border: 1px solid #e0e0e0;
  border-radius: 2px;
}

/* Screen-reader only helper */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.certificado-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #375A0A;
  transition: transform 0.3s;
}

.certificado-icon-wrapper:hover {
  transform: scale(1.1);
}

.certificado-icon-wrapper .v-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tooltip-content {
  max-width: 280px;
  text-align: left;
}
</style>