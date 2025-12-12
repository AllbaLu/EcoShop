import { ref } from 'vue'

// --- 3. DATOS DE PRODUCTOS ---
export const products = ref([
    {
        id: 1,
        name: "Pelota Fetch",
        price: 7990,
        rating: 3.5,
        image: new URL('@/assets/productos/becopets1.webp', import.meta.url).href,

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio (huella moderada)" },
            { icon: "mdi-sprout", color: "primary", label: "Material natural (caucho natural)" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-circle-outline", color: "accent", label: "Impacto medio-bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Material natural (caucho y cuerda reciclada)" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material natural (caucho)" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material natural (sepiolita)" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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
            "Mineral natural sin tratamientos químicos",
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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material natural (diatomita)" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-circle", color: "accent", label: "Impacto medio-alto" },
            { icon: "mdi-sprout", color: "primary", label: "Material natural (gel de sílice)" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf", color: "accent", label: "Impacto bajo-medio" },
            { icon: "mdi-sprout", color: "primary", label: "Materiales duraderos" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf", color: "accent", label: "Impacto bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Materiales duraderos" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Materiales duraderos" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf", color: "accent", label: "Impacto bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Ingredientes naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Materiales naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Materiales naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Materiales naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-circle-outline", color: "accent", label: "Impacto medio-bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Ingredientes naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-circle-outline", color: "accent", label: "Impacto medio-bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Ingredientes naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-circle-outline", color: "accent", label: "Impacto medio-bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Ingredientes naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-circle-outline", color: "accent", label: "Impacto medio-bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Ingredientes naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-circle-outline", color: "accent", label: "Impacto medio-bajo" },
            { icon: "mdi-sprout", color: "primary", label: "Ingredientes naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Ingredientes naturales" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material reciclado" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material reciclado" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material reciclado" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material reciclado" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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

        ecoBadges: [
            { icon: "mdi-leaf-maple", color: "accent", label: "Impacto medio" },
            { icon: "mdi-sprout", color: "primary", label: "Material reciclado" },
            { icon: "mdi-paw", color: "secondary", label: "Sin crueldad" }
        ],

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
])

export function getProductById(id) {
    return products.value.find(prod => prod.id === parseInt(id))
}

