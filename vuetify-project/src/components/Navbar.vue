<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/auth'
import LoginDialog from './LoginDialog.vue'
import RegisterDialog from './RegisterDialog.vue'

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

const showLoginDialog = ref(false)
const showRegisterDialog = ref(false)

// Computed para verificar si el usuario es administrador
const isAdmin = computed(() => {
  console.log('🔍 Checking admin status:', {
    hasUser: !!auth.user,
    userRole: auth.user?.role,
    isAdmin: auth.user && auth.user.role === 'admin'
  })
  return auth.user && auth.user.role === 'admin'
})

// Computed para verificar si está logueado
const isLoggedIn = computed(() => {
  return !!auth.token
})

function goToAdmin() {
  router.push({ name: 'PanelAdminView' })
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'homeview' })
}

function openLogin() {
  showLoginDialog.value = true
}

function openRegister() {
  showRegisterDialog.value = true
}

function handleRegistered() {
  // Cuando se registra exitosamente, abrir el login
  showLoginDialog.value = true
}

// DEBUG: Función temporal para cambiar el role
function toggleAdminRole() {
  if (auth.user) {
    auth.user.role = auth.user.role === 'admin' ? 'user' : 'admin'
    localStorage.setItem('user', JSON.stringify(auth.user))
  }
}
</script>

<template>
  <v-app-bar app color="white" dark>
    <v-toolbar-title>&lt;ECO_SHOP&gt; &lt;En prueba aún&gt;</v-toolbar-title>
    <v-spacer />
    <v-btn text class="bg-white" :to="{ name: 'homeview' }">Inicio</v-btn>
    <v-btn text class="bg-white" :to="{ name: 'sellosview' }">Sellos</v-btn>
    <v-btn text class="bg-white" :to="{ name: 'blogview' }">Blog</v-btn>
    <v-btn text class="bg-white" :to="{ name: 'productsectionview'}">Catálogo Productos</v-btn>
    <v-btn text class="bg-white">Contacto</v-btn>

    <!-- DEBUG: Mostrar estado actual + botón para cambiar role temporalmente -->
    <div v-if="isLoggedIn" class="d-flex align-center mx-2">
      <v-btn 
        size="small" 
        color="warning" 
        @click="toggleAdminRole"
      >
        Toggle Admin
      </v-btn>
    </div>

    <!-- Botón Panel Admin (solo si es admin logueado) -->
    <v-btn 
      v-if="isLoggedIn && isAdmin"
      class="bg-accent position-relative" 
      @click="goToAdmin"
    >
      <v-icon class="mr-2">mdi-shield-account</v-icon>
      PANEL ADMIN
    </v-btn>

    <!-- Botón Carrito (solo si NO es admin o no está logueado) -->
    <v-btn 
      v-if="!isLoggedIn || !isAdmin"
      class="bg-white position-relative" 
      @click="cart.open = true"
    >
      <v-icon class="mr-2">mdi-cart</v-icon>
      CARRITO
      
      <v-badge
        v-if="cart.totalQuantity > 0"
        :content="cart.totalQuantity"
        color="accent"
        class="cart-badge"
      ></v-badge>
    </v-btn>

    <!-- Botones de autenticación -->
    <template v-if="isLoggedIn">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            class="bg-secondary"
            v-bind="props"
          >
            <v-icon class="mr-2">mdi-account-circle</v-icon>
            {{ auth.user?.name || 'Usuario' }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleLogout">
            <v-list-item-title>
              <v-icon class="mr-2">mdi-logout</v-icon>
              Cerrar Sesión
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    
    <template v-else>
      <v-btn outlined class="bg-secondary" @click="openLogin">Log in</v-btn>
      <v-btn class="bg-secondary" @click="openRegister">Register</v-btn>
    </template>
  </v-app-bar>

  <!-- Dialogs -->
  <LoginDialog v-model="showLoginDialog" />
  <RegisterDialog v-model="showRegisterDialog" @registered="handleRegistered" />
</template>



<style scoped>
.v-btn {
  margin-left: 8px;
}
.v-btn:hover {
  background-color: #ffeb3b ; /* Cambia a un color amarillo brillante al pasar el cursor */
  color: #000000 ; /* Cambia el color del texto al pasar el cursor */
}

.cart-badge {
  position: absolute;
  top: 0.3rem;
  right: 0.6rem;
}
</style>
