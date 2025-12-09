<script setup>
import { ref } from 'vue'
import api from '@/api_auth'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'registered'])

const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAdmin: false
})

const loading = ref(false)
const error = ref('')
const success = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const nameRules = [
  v => !!v || 'El nombre es requerido',
  v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres'
]

const emailRules = [
  v => !!v || 'El email es requerido',
  v => /.+@.+\..+/.test(v) || 'El email debe ser válido'
]

const passwordRules = [
  v => !!v || 'La contraseña es requerida',
  v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
]

const confirmPasswordRules = [
  v => !!v || 'Confirma tu contraseña',
  v => v === formData.value.password || 'Las contraseñas no coinciden'
]

async function handleRegister() {
  error.value = ''
  loading.value = true

  try {
    const response = await api.post('/register', {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      role: formData.value.isAdmin ? 'admin' : 'user'
    })

    success.value = true
    
    // Esperar 2 segundos y cerrar
    setTimeout(() => {
      emit('update:modelValue', false)
      emit('registered') // Emitir evento para abrir login
      resetForm()
    }, 2000)

  } catch (err) {
    error.value = err.response?.data?.message || 'Error al registrar. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  formData.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  }
  success.value = false
  error.value = ''
}

function closeDialog() {
  emit('update:modelValue', false)
  resetForm()
}
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="closeDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5 pa-6 bg-secondary text-white">
        Crear Cuenta
      </v-card-title>

      <v-card-text class="pa-6">
        <v-form v-if="!success" @submit.prevent="handleRegister">
          <v-text-field
            v-model="formData.name"
            label="Nombre completo"
            :rules="nameRules"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.email"
            label="Email"
            type="email"
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.password"
            label="Contraseña"
            :type="showPassword ? 'text' : 'password'"
            :rules="passwordRules"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            variant="outlined"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirmar Contraseña"
            :type="showConfirmPassword ? 'text' : 'password'"
            :rules="confirmPasswordRules"
            prepend-inner-icon="mdi-lock-check"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showConfirmPassword = !showConfirmPassword"
            variant="outlined"
            class="mb-4"
            required
          ></v-text-field>

          <v-checkbox
            v-model="formData.isAdmin"
            label="Registrar como Administrador"
            color="primary"
            class="mb-4"
            hide-details
          ></v-checkbox>

          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
            @click:close="error = ''"
          >
            {{ error }}
          </v-alert>
        </v-form>

        <v-alert
          v-else
          type="success"
          variant="tonal"
          prominent
        >
          <div class="text-h6 mb-2">¡Registro exitoso!</div>
          <div>Tu cuenta ha sido creada. Ahora puedes iniciar sesión.</div>
        </v-alert>
      </v-card-text>

      <v-card-actions v-if="!success" class="pa-6 pt-0">
        <v-btn
          variant="text"
          @click="closeDialog"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          variant="elevated"
          :loading="loading"
          @click="handleRegister"
          size="large"
        >
          Registrarse
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-title {
  font-weight: 600;
}
</style>
