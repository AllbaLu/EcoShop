<script setup>

import { ref } from 'vue'

// Autoplay de carrusel para accesibilidad
const autoPlay = ref(true)
const fading = ref(false)

// Respeta preferencias de ususario. Si el sistema pide "reduce motion", desactiva autoplay
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    autoPlay.value = false
}

// Toggle con fade
const toggleAutoplay = () => {
  fading.value = true
  setTimeout(() => {
    autoPlay.value = !autoPlay.value
    fading.value = false
  }, 200)
}


const showArrows = ref(false)
let mobileTimeout = null

function showArrowsTemporarily() {
    showArrows.value = true

    //Mobile: esconder después de un momento
    clearTimeout(mobileTimeout)
    mobileTimeout = setTimeout(() => {
        showArrows.value = false
    }, 1500)
}



const slides = [
    {
        image: new URL('@/assets/perro-paisaje.jpg', import.meta.url).href,
        title: "Bienestar natural para tus mascotas",
        titleColor: '#E6EB51', 
        text: 'Productos eco-amigables que cuidan a tu mascota y al planeta. Haz que cada elección cuente.', 
        overlayPosition: 'right',
        overlayWidth: '45%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'accent' },  
        ]
    },
    {
        image: new URL('@/assets/perro-pelota2.jpg', import.meta.url).href,
        title: "Juguetes responsables, diversión real",
        titleColor: '#C8E8FF',  
        text: 'Pelotas, cuerdas y accesorios fabricados con materiales reciclados y seguros para tu mejor amigo.',
        overlayPosition: 'left',
        overlayWidth: '45%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'secondary' },
        ]
    },
    {
        image: new URL('@/assets/gatos-calle.jpg', import.meta.url).href,
        title: "Marcas que aman y protegen",
        titleColor: '#E6EB51', 
        text: 'Trabajamos con marcas comprometidas con reducir su impacto ambiental sin comprometer la calidad.',
        overlayPosition: 'left',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'accent' }, 
        ]
    },
    {
        image: new URL('@/assets/perro-tina3.jpg', import.meta.url).href,
        title: "Cuidado natural para pieles sensibles",
        titleColor: '#C8E8FF', 
        text: 'Shampoos y grooming sin químicos dañinos, biodegradables y suaves con su piel y el planeta.',
        overlayPosition: 'right',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'secondary' },
        ]
    },
    {
        image: new URL('@/assets/perro-paseo2.jpg', import.meta.url).href,
        title: "Pequeños cambios, gran impacto",
        titleColor: '#E6EB51', 
        text: 'Accesorios y productos reutilizables para paseos más responsables y un futuro más verde.',
        overlayPosition: 'right',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'accent' }, 
        ]
    },
]

</script>

<template>

    <div class="carousel-wrapper">

 <!-- Botón accesible para pausar/reproducir -->
  <div class="carousel-controls-top-right">
    <v-btn
        icon
        class="play-toggle-btn fade-btn"
        :class="{ 'is-fading': fading}"
        @click="toggleAutoplay"
        :aria-pressed="!autoPlay"
        :aria-label="autoPlay ? 'Pausar autoplay' : 'Reanudar autoplay'"
        :title="autoPlay ? 'Pausar autoplay' : 'Reanudar autoplay'"
        >
        <v-icon size="20" aria-hidden="false">
        {{ autoPlay ? 'mdi-pause' : 'mdi-play' }}
        </v-icon>
    </v-btn>
  </div>

    <v-container>
        <v-carousel height="450" 
                    :show-arrows="showArrows" 
                    :cycle="autoPlay"
                    hide-delimiter-background
                    @mouseenter="showArrows = true"
                    @mouseleave="showArrows = false"
                    @touchstart="showArrowsTemporarily">
            <v-carousel-item v-for="(slide, i) in slides" :key="i">

                <!-- Imagen de fondo -->
                <div class="hero-slide" 
                role="img"
                :aria-label="slide.title + '. ' + slide.text"
                :style="`
                background-image: url(${slide.image});
                background-size: ${slide.fit || 'cover'};
                background-position: ${
                slide.fit === 'contain'
                ? (slide.overlayPosition === 'left' ? 'right center' : 'left center')
                : 'center'
                };
                background-repeat: no-repeat;
                `"
                >
                    <!-- Overlay -->
                    <div class="hero-overlay d-flex flex-column justify-center"
                    :class="slide.overlayPosition === 'right' ? 'align-end pr-16' : 'align-start pl-16'"
                    :style="{
                        width: slide.overlayWidth,
                        padding: slide.overlayPadding,
                        right: slide.overlayPosition === 'right' ? '0' : 'auto',
                        left: slide.overlayPosition === 'left' ? '0' : 'auto'
                    }"
                    >
                        <h2 
                        class="text-h3 font-weight-bold mb-10" 
                        :style="{ color: slide.titleColor }"
                        >
                        {{ slide.title }}
                        </h2>

                        <p
                        class="text-body-1 mb-4" 
                        :style="{ color: slide.textColor }" 
                        >
                        {{ slide.text }}
                        </p>

                        <div class="d-flex ga-3">
                            <v-btn v-for="(btn, j) in slide.buttons" :key="j" :color="btn.color" variant="outlined">
                                {{ btn.text }}
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-carousel-item>

        </v-carousel>
    </v-container>
    </div>
</template>


<style scoped>
.carousel-wrapper {
  position: relative;
}

/* Contenedor arriba a la derecha */
.carousel-controls-top-right {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 30;
}

/* Botón circular tipo glass */
.play-toggle-btn {
  width: 42px !important;
  height: 42px !important;
  min-width: 42px !important;
  min-height: 42px !important;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.35) !important;
  color: white !important;
  backdrop-filter: blur(5px);
  border-radius: 50% !important;
  transition: background .25s ease, opacity .25s ease, transform .2s ease;
}

/* Hover */
.play-toggle-btn:hover {
  background: rgba(0, 0, 0, 0.65) !important;
}

/* Fade dinámico */
.fade-btn {
  opacity: 1;
}
.fade-btn.is-fading {
  opacity: 0.3;
}

.hero-slide {
  height: 450px;
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Overlay base */
.hero-overlay {
  background-color: rgba(0, 0, 0, 0.55);
  padding: 40px;
  color: white;
  position: absolute;
  top: 0;
  bottom: 0;
}

/* ------------------------------------------ */
/*            TIPOGRAFÍAS RESPONSIVAS         */
/* ------------------------------------------ */

@media (max-width: 1200px) {
  .hero-overlay h2 {
    font-size: 2rem;
  }
  .hero-overlay p {
    font-size: 1rem;
  }
}

@media (max-width: 900px) {
  .hero-overlay h2 {
    font-size: 1.7rem;
    line-height: 1.2;
  }
  .hero-overlay p {
    font-size: 0.95rem;
  }
}

/* ------------------------------------------ */
/*      PADINGS Y BOTONES EN MINI-PANTALLAS   */
/* ------------------------------------------ */

/* Ajustes fuertes para mobile */
@media (max-width: 768px) {
  .hero-overlay {
    width: 100% !important;
    padding: 1.5rem !important;
    left: 0 !important;
    right: 0 !important;
    align-items: center !important;
    text-align: center;
  }

  .hero-overlay h2 {
    font-size: 1.5rem !important;
    line-height: 1.2;
  }

  .hero-overlay p {
    font-size: 1rem !important;
  }

  .hero-overlay .v-btn {
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem !important;
  }
}

/* Ajustes EXTRA para pantallas muy pequeñas */
@media (max-width: 600px) {
  .hero-overlay {
    padding: 1rem !important;
  }
  .hero-overlay h2 {
    font-size: 1.4rem !important;
  }
  .hero-overlay p {
    font-size: 0.9rem !important;
  }
}

/* -------------------------------------------------- */
/*       SUBIR FLECHAS   */
/* -------------------------------------------------- */

/* Desktop: posición normal de las flechas */
:deep(.v-carousel__controls__prev),
:deep(.v-carousel__controls__next) {
  bottom: 50% !important; /* posición estándar */
  transform: translateY(50%);
}

/* Mobile: subir flechas para que no tapen el texto */
@media (max-width: 600px) {
  :deep(.v-carousel__controls__prev),
  :deep(.v-carousel__controls__next) {
    bottom: 10px !important; /* ajusta según la altura del overlay */
  }
}

</style>