<script setup>
const slides = [
    {
        image: new URL('@/assets/perro-paisaje.jpg', import.meta.url).href,
        title: "Bienestar natural para tus mascotas",
        text: 'Productos eco-amigables que cuidan a tu mascota y al planeta. Haz que cada elección cuente.',
        overlayPosition: 'right',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'primary' },
            { text: 'Contacto', color: 'secondary' }
        ]
    },
    {
        image: new URL('@/assets/perro-pelota2.jpg', import.meta.url).href,
        title: "Juguetes responsables, diversión real",
        text: 'Pelotas, cuerdas y accesorios fabricados con materiales reciclados y seguros para tu mejor amigo.',
        overlayPosition: 'left',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'primary' },
            { text: 'Contacto', color: 'secondary' }
        ]
    },
    {
        image: new URL('@/assets/gatos-calle.jpg', import.meta.url).href,
        title: "Marcas que aman y protegen",
        text: 'Trabajamos con marcas comprometidas con reducir su impacto ambiental sin comprometer la calidad.',
        overlayPosition: 'left',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'primary' },
            { text: 'Contacto', color: 'secondary' }
        ]
    },
    {
        image: new URL('@/assets/perro-tina3.jpg', import.meta.url).href,
        title: "Cuidado natural para pieles sensibles",
        text: 'Shampoos y grooming sin químicos dañinos, biodegradables y suaves con su piel y el planeta.',
        overlayPosition: 'right',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'primary' },
            { text: 'Contacto', color: 'secondary' }
        ]
    },
    {
        image: new URL('@/assets/perro-paseo2.jpg', import.meta.url).href,
        title: "Pequeños cambios, gran impacto",
        text: 'Accesorios y productos reutilizables para paseos más responsables y un futuro más verde.',
        overlayPosition: 'right',
        overlayWidth: '40%',
        overlayPadding: '2rem',
        fit: 'cover',
        buttons: [
            { text: 'Ver más', color: 'primary' },
            { text: 'Contacto', color: 'secondary' }
        ]
    },

]
</script>

<template>
    <v-container>
        <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">

                <!-- Imagen de fondo -->
                <div class="hero-slide" :style="`
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
                        <h2 class="text-h3 font-weight-bold mb-10">{{ slide.title }}</h2>
                        <p class="text-body-1 mb-4">{{ slide.text }}</p>

                        <div class="d-flex ga-3">
                            <v-btn v-for="(btn, j) in slide.buttons" :key="j" :color="btn.color" variant="flat">
                                {{ btn.text }}
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-carousel-item>

        </v-carousel>
    </v-container>
</template>


<style scoped>
.hero-slide {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-overlay {
  background-color: rgba(0, 0, 0, 0.45); /* overlay oscuro */
  padding: 40px;
  width: 100%;
  height: 100%;
  color: white;
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>
