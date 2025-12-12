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

const drawer = ref(false)

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
  <v-app-bar app color="white" dark density="default">
    <!-- Ícono Hamburguesa en móviles -->
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />

    <!-- LOGO -->
    <v-toolbar-title class="d-flex align-center" style="min-width: 120px">
      <v-img
        src="@/assets/ecoshop-logo.png"
        alt="Logo Ecoshop"
        height="100%"
        width="auto"
        contain
        class="navbar-logo"
      />
    </v-toolbar-title>

    <v-spacer />

    <!-- BOTONES GRANDES (solo escritorio) -->
    <div class="d-none d-md-flex align-center">
      <v-btn text class="bg-white" :to="{ name: 'homeview' }">Inicio</v-btn>
      <v-btn text class="bg-white" :to="{ name: 'sellosview' }">Sellos</v-btn>
      <v-btn text class="bg-white" :to="{ name: 'blogview' }">Blog</v-btn>
      <v-btn text class="bg-white" :to="{ name: 'productsectionview'}">Catálogo</v-btn>
      <v-btn text class="bg-white" :to="{ name: 'contactoview' }">Contacto</v-btn>
    </div>

    <!-- ADMIN TOGGLE (debug) -->
    <div v-if="isLoggedIn" class="d-none d-md-flex align-center mx-2">
      <v-btn size="small" color="warning" @click="toggleAdminRole">
        Toggle Admin
      </v-btn>
    </div>

    <!-- PANEL ADMIN (solo admin) -->
    <v-btn
      v-if="isLoggedIn && isAdmin"
      class="bg-accent d-none d-md-flex"
      @click="goToAdmin"
    >
      <v-icon class="mr-2">mdi-shield-account</v-icon>
      PANEL ADMIN
    </v-btn>

    <!-- CARRITO -->
    <v-btn
      v-if="!isLoggedIn || !isAdmin"
      class="bg-white position-relative"
      @click="cart.open = true"
    >
      <v-icon>mdi-cart</v-icon>

      <v-badge
        v-if="cart.totalQuantity > 0"
        :content="cart.totalQuantity"
        color="accent"
        class="cart-badge"
      />
    </v-btn>

    <!-- LOGIN / USER MENU -->
    <template v-if="isLoggedIn">
      <v-menu offset-y class="d-none d-md-flex">
        <template #activator="{ props }">
          <v-btn class="bg-secondary" v-bind="props">
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
      <v-btn outlined class="bg-secondary d-none d-md-flex" @click="openLogin">Log in</v-btn>
      <v-btn class="bg-secondary d-none d-md-flex" @click="openRegister">Register</v-btn>
    </template>
  </v-app-bar>

  <!-- DRAWER PARA CELULARES -->
  <v-navigation-drawer v-model="drawer" temporary class="d-md-none">
    <v-list nav>
      <v-list-item :to="{ name: 'homeview' }">Inicio</v-list-item>
      <v-list-item :to="{ name: 'sellosview' }">Sellos</v-list-item>
      <v-list-item :to="{ name: 'blogview' }">Blog</v-list-item>
      <v-list-item :to="{ name: 'productsectionview' }">Catálogo</v-list-item>
      <v-list-item :to="{ name: 'contactoview' }">Contacto</v-list-item>

      <v-divider class="my-3"></v-divider>

      <v-list-item v-if="isLoggedIn && isAdmin" @click="goToAdmin">
        <v-icon class="mr-2">mdi-shield-account</v-icon>
        Panel Admin
      </v-list-item>

      <v-list-item v-if="isLoggedIn" @click="handleLogout">
        <v-icon class="mr-2">mdi-logout</v-icon>
        Cerrar Sesión
      </v-list-item>

      <template v-else>
        <v-list-item @click="openLogin">Log In</v-list-item>
        <v-list-item @click="openRegister">Registrarse</v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>

  <!-- Dialogs -->
  <LoginDialog v-model="showLoginDialog" />
  <RegisterDialog v-model="showRegisterDialog" @registered="handleRegistered" />
</template>



<style scoped>
.navbar-logo {
  height: 100%;        /* Ocupar toda la altura del navbar */
  max-height: 64px;    /* Controla el límite según tu navbar */
  width: auto;         /* Mantiene proporción */
  object-fit: contain; /* Evita que se corte */
  display: block;
}

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
