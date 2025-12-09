<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const emailRules = [
  v => !!v || 'El email es requerido',
  v => /.+@.+\..+/.test(v) || 'El email debe ser válido'
]

const passwordRules = [
  v => !!v || 'La contraseña es requerida',
  v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
]

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    await auth.login(email.value, password.value)
    
    // Cerrar el dialog
    emit('update:modelValue', false)
    
    // Redirigir según el rol
    if (auth.user?.role === 'admin') {
      router.push({ name: 'PanelAdminView' })
    } else {
      router.push({ name: 'homeview' })
    }
    
    // Limpiar formulario
    email.value = ''
    password.value = ''
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.'
  } finally {
    loading.value = false
  }
}

function closeDialog() {
  emit('update:modelValue', false)
  error.value = ''
}
</script>

<template>
  <v-dialog :model-value="modelValue" @update:model-value="closeDialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5 pa-6 bg-primary text-white">
        Iniciar Sesión
      </v-card-title>

      <v-card-text class="pa-6">
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
            variant="outlined"
            class="mb-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
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

          <div class="text-right mb-4">
            <a href="#" class="text-primary text-decoration-none">¿Olvidaste tu contraseña?</a>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-btn
          variant="text"
          @click="closeDialog"
        >
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="elevated"
          :loading="loading"
          @click="handleLogin"
          size="large"
        >
          Iniciar Sesión
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
