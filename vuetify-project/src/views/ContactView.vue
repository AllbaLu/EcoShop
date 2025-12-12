<script setup>
import { ref } from 'vue';

const valid = ref(false);
const form = ref(null);

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const nameRules = [
  v => !!v || 'El nombre es requerido',
  v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres'
];

const emailRules = [
  v => !!v || 'El e-mail es requerido',
  v => /.+@.+\..+/.test(v) || 'El e-mail debe ser válido'
];

const snackbar = ref(false);

const submitForm = () => {
  if (valid.value) {
    // Aquí iría la lógica para enviar al backend
    console.log('Enviando formulario:', formData.value);
    snackbar.value = true;
    // Resetear formulario
    form.value.reset();
  }
};
</script>

<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="5" class="pr-md-8 mb-8 mb-md-0">
        <h1 class="text-h3 font-weight-bold mb-6 text-primary">Contáctanos</h1>
        <p class="text-body-1 text-grey-darken-1 mb-8">
          ¿Tienes preguntas sobre nuestros productos sostenibles? ¿Quieres saber más sobre nuestras certificaciones? Estamos aquí para ayudarte a tomar decisiones más verdes.
        </p>

        <div class="d-flex align-center mb-6">
          <v-avatar color="primary" size="40" class="mr-4">
            <v-icon color="white">mdi-map-marker</v-icon>
          </v-avatar>
          <div>
            <div class="font-weight-bold">Nuestra Oficina</div>
            <div class="text-grey-darken-1">Avenida Las Torres N°003, Santiago, Chile</div>
          </div>
        </div>

        <div class="d-flex align-center mb-6">
          <v-avatar color="primary" size="40" class="mr-4">
            <v-icon color="white">mdi-phone</v-icon>
          </v-avatar>
          <div>
            <div class="font-weight-bold">Teléfono</div>
            <div class="text-grey-darken-1">+56 2 11 1234 5678</div>
          </div>
        </div>

        <div class="d-flex align-center">
          <v-avatar color="primary" size="40" class="mr-4">
            <v-icon color="white">mdi-email</v-icon>
          </v-avatar>
          <div>
            <div class="font-weight-bold">Email</div>
            <div class="text-grey-darken-1">contacto@ecoshop.com</div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="4" class="pa-6 rounded-lg">
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.name"
                  :rules="nameRules"
                  label="Nombre completo"
                  variant="outlined"
                  color="primary"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="formData.email"
                  :rules="emailRules"
                  label="Correo electrónico"
                  variant="outlined"
                  color="primary"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="formData.subject"
                  :items="['Consulta general', 'Pedido', 'Reclamo', 'Venta Mayorista']"
                  label="Asunto"
                  variant="outlined"
                  color="primary"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="formData.message"
                  label="Tu mensaje"
                  variant="outlined"
                  color="primary"
                  rows="4"
                ></v-textarea>
              </v-col>
            </v-row>

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
  </v-container>
</template>

<style scoped>
.text-primary { color: #375A0A !important; }
</style>