<script setup>
import { ref} from 'vue'

//Email + reglas de validación
const valid = ref(false)
const email = ref('')
const emailRules = [
    value => !!value || 'Ingresa un correo electrónico',
    value => /.+@.+\..+/.test(value) || 'Ingresa un correo válido'
]

//Navegación footer
const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Sellos", href: "/sellos" },
    { label: "Blog", href: "/blog" },
    { label: "Catálogo Productos", href: "/catalogo" },
    { label: "Contacto", href: "/contacto" },
    { label: "Carrito", href: "/carrito" },
]

//Links redes
const redes = [
    { text: 'Instagram', icon: 'mdi-instagram', href: 'https://instagram.com' },
    { text: 'YouTube', icon: 'mdi-youtube', href: 'https://youtube.com' },
    { text: 'Twitter', icon: 'mdi-twitter', href: 'https://x.com' },
]
</script>


<template>
    <v-container fluid class="footer">
        <v-container>
            <v-row no-gutters>

                <!-- ACCESOS RÁPIDOS -->
                <v-col>
                    <v-sheet class="footer-text pa-2 ma-2">
                        ACCESOS RÁPIDOS
                        <v-list class="footer-text text-body-2" density="compact">
                            <v-list-item v-for="link in navLinks" :key="link.label" :to="link.href">
                                {{ link.label}}
                            </v-list-item>
                        </v-list>
                    </v-sheet>
                </v-col>

                <!-- INFORMACIÓN DE USUARIO -->
                <v-col>
                    <v-sheet class="footer-text pa-2 ma-2">
                        INFORMACIÓN DE USUARIO
                        <v-list class="footer-text text-body-2" density="compact">
                            <v-list-item>Centro de Ayuda</v-list-item>
                            <v-list-item>Seguimiento de pedidos</v-list-item>
                            <v-list-item>Políticas de Privacidad</v-list-item>
                            <v-list-item>Términos y Condiciones</v-list-item>
                            <v-list-item>Política de Devoluciones</v-list-item>
                            <v-list-item>Atención al Cliente</v-list-item>
                        </v-list>
                    </v-sheet>
                </v-col>

                <!-- NEWSLETTER -->
                <v-col>
                    <v-sheet class="footer-text pa-2 ma-2">
                        <v-list class="footer-text">
                            NEWSLETTER
                            <v-list-item class="text-body-2 footer-text" density="comfortable">
                                Suscríbete para recibir novedades
                            </v-list-item>


                            <v-form @submit.prevent>
                                <v-text-field class="text-body-2 pa-1" v-model="email" :rules="emailRules"
                                    label="Correo electrónico" placeholder="Ingresa tu correo" variant="outlined"
                                    density="comfortable" required />
                                <v-btn class="text-body-2" color="#E6EB51" type="submit" block>
                                    SUSCRIBIR
                                </v-btn>
                                 <v-snackbar v-model="snackbar" color="success" timeout="3000">
      ¡Mensaje enviado correctamente! Te responderemos pronto.
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>

    <!-- NEWSLETTER
<v-btn
              block
              color="primary"
              size="large"
              type="submit"
              class="mt-4 text-white"
              :disabled="!valid"
            >
              Enviar Mensaje
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="success" timeout="3000">
      ¡Mensaje enviado correctamente! Te responderemos pronto.
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar> 
 -->









                            </v-form>
                        </v-list>
                    </v-sheet>
                </v-col>

                <!-- REDES SOCIALES -->
                <v-col>
                    <v-sheet class="footer-text pa-2 ma-2">
                        CONTACTO
                        <v-list class="footer-text text-body-2" density="comfortable">
                            <v-list-item>Avenida Las Torres N°55,
                                <br>Buenos Aires,</br>
                                <br>Argentina</br> </v-list-item>
                            <v-list-item>+54 9 11 1234 5678</v-list-item>
                            <v-list-item>contacto@ecoshop.com</v-list-item>
                        </v-list>

                        <!-- íconos uno al lado del otro-->
                        <v-row class="mt-2" dense>
                            <v-col v-for="(item, i) in redes" :key="i" cols="auto" class="d-flex align-center">
                                <v-btn icon variant="text" :href="item.href || '#'" target="_blank">
                                    <v-icon :icon="item.icon" size="28"></v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <div class="d-flex justify-center align-center">
                <div class="text-body-2 footer-text text-center">
                    © 2025 - Todos los derechos reservados. <br />
                    Desarrollado por: No Country - S11-25-Equipo 62-WebApp
                </div>
            </div>
        </v-container>


    </v-container>
</template>

<style scoped>
.footer-text {
    background-color: transparent;
    color: #375A0A;
    font-weight: 600;
}

</style>