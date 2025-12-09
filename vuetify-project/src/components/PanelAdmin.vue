<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import api from '@/api_auth'

const auth = useAuthStore()

const userName = computed(() => {
  return auth.user?.name || 'Usuario'
})

// Form data
const formData = ref({
  title: '',
  description: '',
  price: 0,
  stock: 0,
  image: '',
  materials: '',
  origin: '',
  emissions: '',
  ecoBadges: []
})

const imagePreview = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')

// Opciones de badges ecológicos
const ecoBadgeOptions = [
  { name: 'Orgánico', color: '#375A0A' },
  { name: 'Reciclado', color: '#E6EB51' },
  { name: 'Carbono Neutral', color: '#010101' },
  { name: 'Comercio Justo', color: '#C8E8FF' }
]

function loadImageFromUrl() {
  if (formData.value.image) {
    imagePreview.value = formData.value.image
  }
}

async function handleSubmit() {
  error.value = ''
  loading.value = true
  
  try {
    const response = await api.post('/products', {
      title: formData.value.title,
      description: formData.value.description,
      price: parseFloat(formData.value.price),
      stock: parseInt(formData.value.stock),
      image: formData.value.image || 'mdi-package-variant',
      materials: formData.value.materials,
      origin: formData.value.origin,
      emissions: formData.value.emissions,
      ecoBadges: formData.value.ecoBadges,
      rating: 0
    })
    
    success.value = true
    
    // Resetear formulario después de 2 segundos
    setTimeout(() => {
      resetForm()
      success.value = false
    }, 2000)
    
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al crear el producto'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  formData.value = {
    title: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    materials: '',
    origin: '',
    emissions: '',
    ecoBadges: []
  }
  imagePreview.value = ''
}
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-btn></v-btn>
      <h3 class="ml-4 font-weight-bold">Buenos días, {{ userName }}. <br> Bienvenido al panel de administración</h3>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="mb-8" cols="8" md="8"> 
          <v-col cols="12" md="4">
            <v-img
              src="https://cdn.pixabay.com/photo/2016/04/21/22/02/aerial-view-1344591_1280.jpg" 
              cover
              class="bg-grey-lighten-2 rounded-lg hover-card cursor-pointer mb-4"
              aspect-ratio="2">
            </v-img>
          </v-col>

          <v-col cols="12" md="4">
            <v-img
              src="https://cdn.pixabay.com/photo/2016/04/21/22/02/aerial-view-1344591_1280.jpg" 
              cover
              class="bg-grey-lighten-2 rounded-lg hover-card cursor-pointer mb-4"
              aspect-ratio="2">
            </v-img>
          </v-col>

          <v-col cols="12" md="4">
            <v-img
              src="https://cdn.pixabay.com/photo/2016/04/21/22/02/aerial-view-1344591_1280.jpg" 
              cover
              class="bg-grey-lighten-2 rounded-lg hover-card cursor-pointer mb-4"
              aspect-ratio="2">
            </v-img>
          </v-col>
        </v-row>

        <h2 class="text-h5 font-weight-bold ml-4">INGRESO DE PRODUCTOS A LA PAGINA:</h2>

        <v-container class="mt-5">
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="pa-6" elevation="5">
                  <div
                    class="d-flex justify-center align-center mt-6"
                    style="
                    width: 100%;
                    height: 250px;
                    border: 2px dashed #bbb;
                    border-radius: 10px;
                    background-color: #f8f8f8;
                  ">
                  <v-img v-if="imagePreview" :src="imagePreview" cover height="100%"></v-img>
                  <span v-else style="color: #999;">Vista previa de la imagen</span>
                </div>
                <br>
                <h3 class="mb-4">Carga imagen del producto</h3>
                <p>Inserte URL o ícono Material Design (mdi-*):</p>
                <h3>Link, o URL (http://www.example.com)</h3>
                <br>
                <v-form>
                  <v-text-field 
                    v-model="formData.image" 
                    label="URL de la imagen o ícono MDI" 
                    placeholder="http://www.example.com o mdi-package"
                  ></v-text-field>
                  <div class="d-flex flex-start mt-4">
                    <v-btn class="bg-black" size="large" @click="loadImageFromUrl">CARGAR DESDE URL</v-btn>
                  </div>
                </v-form>
              </v-card>
            </v-col>

            <v-col cols="12" md="8">
              <v-card class="pa-6" elevation="3">
                  <v-form @submit.prevent="handleSubmit">
                    <v-row>
                      <v-col cols="12" md="6">
                        <p class="font-weight-bold">Nombre producto *</p>
                        <v-text-field 
                          v-model="formData.title"
                          class="custom-input"
                          placeholder="Nombre del producto (Por ejemplo: 'Camiseta Ecoamigable')"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <p class="font-weight-bold">Materiales</p>
                        <v-text-field 
                          v-model="formData.materials"
                          class="custom-input" 
                          placeholder="Ej: Algodón orgánico, Bambú"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <p class="font-weight-bold">Descripción producto *</p>
                        <v-textarea 
                          v-model="formData.description"
                          class="custom-input" 
                          placeholder="Descripción detallada del producto"
                          rows="3"
                          required
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" md="4">
                        <p class="font-weight-bold">Valor producto (CLP) *</p>
                        <v-text-field
                          v-model="formData.price"
                          class="custom-input"
                          type="number"
                          placeholder="Valor en $ CLP"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4">
                        <p class="font-weight-bold">Stock *</p>
                        <v-text-field
                          v-model="formData.stock"
                          class="custom-input"
                          type="number"
                          placeholder="Cantidad disponible"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="4">
                        <p class="font-weight-bold">Origen</p>
                        <v-text-field
                          v-model="formData.origin"
                          class="custom-input"
                          placeholder="Ej: Chile, Perú"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <p class="font-weight-bold">Emisiones de CO2</p>
                        <v-text-field
                          v-model="formData.emissions"
                          class="custom-input"
                          placeholder="Ej: 0.2kg CO2e"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <p class="font-weight-bold">Sellos Ecológicos</p>
                        <v-select
                          v-model="formData.ecoBadges"
                          :items="ecoBadgeOptions"
                          item-title="name"
                          item-value="color"
                          multiple
                          chips
                          placeholder="Selecciona sellos"
                          class="custom-input"
                        >
                          <template v-slot:chip="{ item }">
                            <v-chip :color="item.value" text-color="white">{{ item.title }}</v-chip>
                          </template>
                        </v-select>
                      </v-col>
                    </v-row>

                    <!-- Mensajes de éxito/error -->
                    <v-alert v-if="success" type="success" class="mt-4">
                      ¡Producto creado exitosamente!
                    </v-alert>
                    <v-alert v-if="error" type="error" class="mt-4">
                      {{ error }}
                    </v-alert>

                    <v-btn 
                      block 
                      class="bg-black mt-4" 
                      size="large" 
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                    >
                      INGRESAR PRODUCTO
                    </v-btn>
                  </v-form>                
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-main>

  </v-app>
</template>



<style scoped>


.v-btn {
  margin-left: 8px;
}
.v-btn:hover {
  background-color: #ffeb3b ; /* Cambia a un color amarillo brillante al pasar el cursor */
  color: #000000 ; /* Cambia el color del texto al pasar el cursor */
}
</style>
