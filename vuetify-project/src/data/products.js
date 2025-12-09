// --- 3. DATOS DE PRODUCTOS ---
export const products = ref([
    {
        id: 1,
        name: "Pelota Fetch",
        price: 7.99, rating: 3.5,
        image: new URL('@/assets/productos/becopets1.webp', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Juguetes'],
        description: `Pelota compatible con lanzadores, en colores brillantes. 
        Segura para los dientes al atraparla, hecha de caucho natural suave y elástico. 
        Tiene un agujero en el centro para un juego más seguro (y silba cuando vuela). 
        Los colores brillantes la hacen más fácil de ver entre el pasto alto.`,
        materials: '54% caucho natural, 11% caucho sintético, colorantes y aditivos',
        origin: {
            name: 'Beco pets',
            url: 'https://www.becopets.com/products/natural-rubber-fetch-ball'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },
    {
        id: 2,
        name: "Slinger Pebble",
        price: 12.99, rating: 4.5,
        image: new URL('@/assets/productos/becopets2.webp', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Juguetes'],
        description: `Huevo con cuerda para lanzar, buscar y tirar.
    Seguro para los dientes al atraparlo y durante el juego.
    Mango de cuerda larga para mayor distancia de lanzamiento
    y colores brillantes.`,
        materials: '54% caucho natural, 11% caucho sintético, colorantes, aditivos y cuerda de poliéster reciclado (rPET)',
        origin: {
            name: 'Beco pets',
            url: 'https://www.becopets.com/products/natural-rubber-pebble-slinger-toy?variant=44410784055548'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },
    {
        id: 3,
        name: "Treat Bone",
        price: 10.99, rating: 5.0,
        image: new URL('@/assets/productos/becopets3.webp', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Juguetes'],
        description: `Resistente juguete para masticar, 
    ideal para perros con mordida fuerte. Ningún juguete es indestructible, 
    pero este se acerca bastante.Abertura en cada extremo para rellenar 
    con los premios favoritos de tu perro.`,
        materials: '54% caucho natural, 11% caucho sintético, colorantes y aditivos.',
        origin: {
            name: 'Beco pets',
            url: 'https://www.becopets.com/products/natural-rubber-chew-bone?variant=44410787234044'
        }
    },
    {
        id: 10,
        name: "Cepillo de dientes de bambússsssssssssssss",
        price: 20000, rating: 3.5, image: "mdi-toothbrush",
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Baño', 'Zero Waste'],
        description: 'Cepillo 100% biodegradable.', materials: 'Bambú Moso', origin: 'Vietnam', emissions: '0.2kg CO2e', recommendations: [2, 3]
    },
    {
        id: 4,
        name: "Arena para gatitos",
        price: 6.95, rating: 4.5,
        image: new URL('@/assets/productos/sanicat1.png', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Arena, Gatos'],
        description: `La fragancia de valeriana de la arena está especialmente 
        formulada para facilitar el adiestramiento de los gatitos y facilitar 
        el uso de la caja de arena, mientras que los finos gránulos son respetuosos 
        con sus patitas y piel sensibles y apenas generan polvo, por lo que el entorno 
        se mantiene limpio y fresco tanto para ti como para tu gato.`,
        materials: 'Sepiolita natural',
        origin: {
            name: 'Sanicat',
            url: 'https://www.sanicat.com/es/producto/mejor-arena-gatitos/'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },
    {
        id: 5,
        name: "Arena para gatos Advanced Hygiene sin fragancia",
        price: 6.95, rating: 4.0,
        image: new URL('@/assets/productos/sanicat2.jpg', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Arena, Gatos'],
        description: `Arena absorbente superior que atrapa la orina y 
        controla los malos olores hasta tres veces más tiempo que las 
        arenas no aglomerantes convencionales. Formato: 5L`,
        materials: 'Diatomita natural.',
        origin: {
            name: 'Sanicat',
            url: 'https://www.sanicat.com/es/producto/arena-para-gatos-advanced-hygiene-sin-fragancia/'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },

    {
        id: 6,
        name: "Sanicat Diamonds - Aroma Aloe Vera",
        price: 6.00, rating: 4.3,
        image: new URL('@/assets/productos/sanicat3.png', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Arena, Gatos'],
        description: `Con aroma de aloe vera para una frescura continua. Esta 
        arena es muy adecuada para dueños de gatos que no tienen tiempo de limpiar 
        a menudo la bandeja de arena.Gracias a su alta capacidad de absorción y 
        control de olores, esta arena absorbe la humedad al instante manteniendo 
        la bandeja seca. Formato: 5L`,
        materials: 'Gel de sílice',
        origin: {
            name: 'Sanicat',
            url: 'https://www.sanicat.com/es/producto/diamonds-aloe-vera/'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },
    {
        id: 7,
        name: "Lima de uñas de diamante Safari",
        price: 6.20, rating: 4.5,
        image: new URL('@/assets/productos/iherb1.avif', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Aseo, Perros'],
        description: `Producto especialmente contorneado para las uñas de las mascotas.
        Mantiene las uñas suaves y saludables. Cortar y limar las uñas de forma adecuada 
        y con regularidad es importante para la comodidad y la salud de su mascota.`,
        materials: 'Lima de diamante',
        origin: {
            name: 'iHerb',
            url: 'https://cl.iherb.com/pr/safari-diamond-nail-file-1-count/105847'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },
    {
        id: 8,
        name: "Cortauñas de acero inoxidable Safari",
        price: 9.40, rating: 4.5,
        image: new URL('@/assets/productos/iherb2.avif', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Aseo, Perros'],
        description: `Cortauñas de acero inoxidable para perros pequeños
        con tope de seguridad para evitar lesiones. Corte afilado para resultados 
        efectivos y duraderos`,
        materials: 'Acero inoxidable',
        origin: {
            name: 'iHerb',
            url: 'https://cl.iherb.com/pr/safari-stainless-steel-nail-trimmer-small-dogs-1-tool/105844'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },

    {
        id: 9,
        name: "Cepillo suave y liso Safari",
        price: 9.40, rating: 4.5,
        image: new URL('@/assets/productos/iherb3.avif', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Aseo, Perros'],
        description: `Ideal para perros medianos, con puntas recubiertas
        para mayor comodidad. Elimina los enredos y el cabello suelto. Su uso frecuente
        ayuda a mantener un pelaje saludable`,
        materials: 'Acero inoxidable',
        origin: {
            name: 'iHerb',
            url: 'https://cl.iherb.com/pr/safari-soft-slicker-brush-for-medium-dogs-1-brush/98950'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },
    {
        id: 10,
        name: "Ecos - Quitamanchas y quita olores , limón",
        price: 10.30, rating: 4.6,
        image: new URL('@/assets/productos/iherb4.png', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Aseo, Mascotas'],
        description: `Extraordinariamente eficaz en las manchas difíciles
        , ya que utiliza enzimas activas e ingredientes cuidadosamente 
        seleccionados que no decoloran los colores. Elimina los olores
        en su origen y no necesita enjuage. Formato: 650 ml`,
        materials: 'Biodegradable.',
        origin: {
            name: 'iHerb',
            url: 'https://cl.iherb.com/pr/earth-friendly-products-ecos-stain-odor-remover-lemon-22-fl-oz-650-ml/110629'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },
        {
        id: 11,
        name: "Earth Rated - Bolsas para desechos de perros , sin fragancia",
        price: 10.30, rating: 4.6,
        image: new URL('@/assets/productos/iherb5.png', import.meta.url).href,
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Aseo, Perros'],
        description: `Bolsas ecológicas extrafuertes y extralargas
        (9x13in). Garantía 100% a prueba de fugas. Paquete económico: 270 bolsas`,
        materials: 'Bolsas ecológicas.',
        origin: {
            name: 'iHerb',
            url: 'https://cl.iherb.com/pr/earth-rated-dog-poop-bags-unscented-270-bags/104298'

        },
        emissions: '0.2kg CO2e',
        recommendations: [2, 3]
    },





    {
        id: 1,
        name: "Cepillo de dientes de bambú",
        price: 20, rating: 3.5, image: "mdi-toothbrush",
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Baño', 'Zero Waste'],
        description: 'Cepillo 100% biodegradable.', materials: 'Bambú Moso', origin: 'Vietnam', emissions: '0.2kg CO2e', recommendations: [2, 3]
    },
    {
        id: 1,
        name: "Cepillo de dientes de bambú",
        price: 20, rating: 3.5, image: "mdi-toothbrush",
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Baño', 'Zero Waste'],
        description: 'Cepillo 100% biodegradable.', materials: 'Bambú Moso', origin: 'Vietnam', emissions: '0.2kg CO2e', recommendations: [2, 3]
    },














    {
        id: 1,
        name: "Cepillo de dientes de bambú",
        price: 20, rating: 3.5, image: "mdi-toothbrush",
        ecoBadges: ["#375A0A", "#E6EB51"],
        sizes: ['S'], tags: ['Baño', 'Zero Waste'],
        description: 'Cepillo 100% biodegradable.', materials: 'Bambú Moso', origin: 'Vietnam', emissions: '0.2kg CO2e', recommendations: [2, 3]
    },
    {
        id: 2,
        name: "Camiseta de Algodón",
        price: 25.00, rating: 5, image: "mdi-tshirt-crew",
        ecoBadges: ['#375A0A'],
        sizes: ['S', 'M', 'L'], tags: ['Ropa'],
        description: 'Camiseta básica suave.', materials: 'Algódón', origin: 'Perú', emissions: '4.5kg CO2e', recommendations: [1, 6]
    },
    {
        id: 3,
        name: "Botella de Vidrio",
        price: 18.00, rating: 4, image: "mdi-bottle-wine",
        ecoBadges: ["#F1FFFF", "#C8E8FF"],
        sizes: ['M'],
        tags: ['Cocina', 'Viaje'],
        description: 'Dile adiós a los plásticos de un solo uso con esta botella de vidrio de borosilicato de alta resistencia. Soporta choques térmicos (bebidas frías o calientes) y cuenta con una funda de silicona antideslizante para protección extra. Su tapa de bambú hermética con sello de silicona asegura que no haya derrames.',
        materials: 'Vidrio',
        origin: 'Local',
        emissions: '1.2kg CO2e',
        recommendations: [1]
    },
    {
        id: 4,
        name: "Cuaderno Ecológico",
        price: 15.00, rating: 4.8, image: 'mdi-notebook',
        ecoBadges: ['#375A0A'],
        sizes: ['M'],
        tags: ['Oficina'],
        description: 'Captura tus ideas en este cuaderno premium. Sus 120 páginas están hechas de papel 100% reciclado post-consumo de 90g, evitando que la tinta traspase. La tapa dura de cartón reciclado es resistente y elegante. El proceso de blanqueado es libre de cloro (TCF), protegiendo los recursos hídricos.', materials: 'Papel',
        origin: 'Brasil',
        emissions: '0.8kg CO2e',
        recommendations: [5]
    },
    {
        id: 5,
        name: "Batería Solar",
        price: 45.00, rating: 4.2, image: 'mdi-battery-charging',
        ecoBadges: ['#E6EB51', "#C8E8FF"],
        sizes: ['S'],
        tags: ['Tecnología', 'Viaje'],
        description: 'Carga con energía limpia.',
        materials: 'Plástico reciclado',
        origin: 'China',
        emissions: '12kg CO2e',
        recommendations: [4]
    },
    {
        id: 6,
        name: "Mochila de Cáñamo",
        price: 60.00, rating: 4.9, image: "mdi-bag-personal",
        ecoBadges: ['#375A0A', '#010101'],
        sizes: ['L'], tags: ['Viaje', 'Ropa'],
        description: 'Resistente y estilosa.', materials: 'Cáñamo', origin: 'Nepal', emissions: '3.1kg CO2e', recommendations: [2]
    }
]);