<script setup>
import { onMounted, ref, computed } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import api from '@/api'; 
import { sellos } from '@/data/certifications.js';

const cart = useCartStore();
const preferenceId = ref(null);
const initPoint = ref(null);
const loading = ref(true);

const totalEmissions = computed(() => {
  return cart.items.reduce((sum, item) => {
    // Extraer número de strings como "0.2kg CO2e" o "100"
    // Si es un objeto (ej: {production: "0.4 - 0.8", ...}), intentamos sacar un promedio del total_estimated
    let emissionValue = 0;
    
    if (item.environment && item.environment.carbon_footprint_kgCO2e) {
      const val = item.environment.carbon_footprint_kgCO2e;
      if (typeof val === 'string') {
        // Caso simple: "0.2" o "0.2kg CO2e"
        emissionValue = parseFloat(val) || 0;
      } else if (typeof val === 'object' && val.total_estimated) {
        // Caso complejo: "0.5 - 1.1" -> promedio 0.8
        const range = val.total_estimated.split('-').map(v => parseFloat(v));
        if (range.length === 2) {
          emissionValue = (range[0] + range[1]) / 2;
        } else {
          emissionValue = parseFloat(range[0]) || 0;
        }
      }
    }
    
    return sum + (emissionValue * item.quantity);
  }, 0);
});

const uniqueCertifications = computed(() => {
  const certs = new Set();
  cart.items.forEach(item => {
    if (item.certifications && Array.isArray(item.certifications)) {
      item.certifications.forEach(c => certs.add(c));
    }
  });
  return Array.from(certs);
});

function getSelloImg(certName) {
  const sello = sellos.find(s => s.title === certName || s.subtitle === certName);
  return sello ? sello.img : '';
}

function getSelloTitle(certName) {
  const sello = sellos.find(s => s.title === certName || s.subtitle === certName);
  return sello ? sello.title : certName;
}

const errorMessage = ref('');

const createPreference = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await api.post('/create_preference', {
      items: cart.items
    });
    preferenceId.value = response.data.preference_id;
    initPoint.value = response.data.init_point || null;
    // Esperar a que el DOM se actualice antes de inicializar MP
    setTimeout(() => initMercadoPago(), 100);
  } catch (error) {
    console.error('Error creating preference:', error);
    errorMessage.value = error.response?.data?.error || 'Error desconocido al contactar el servidor.';
    if (error.response?.data?.details) {
      console.log('Detalles MP:', error.response.data.details);
    }
  } finally {
    loading.value = false;
  }
};

const initMercadoPago = () => {
  if (!preferenceId.value) return;
  
  // Limpiar contenedor previo si existe (aunque v-if lo maneja, es seguridad extra)
  const container = document.getElementById('wallet_container');
  if (container) container.innerHTML = '';

  // REEMPLAZAR CON TU PUBLIC KEY DE PRUEBA
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY || 'TEST-4926c08f-53d1-41a6-8868-83265a755637';
  const mp = new window.MercadoPago(publicKey, { 
    locale: 'es-CL' // Cambiado a Chile por defecto
  });

  mp.bricks().create("wallet", "wallet_container", {
    initialization: {
      preferenceId: preferenceId.value,
    },
    customization: {
      texts: {
        valueProp: 'smart_option',
      },
    },
  });
};

onMounted(() => {
  if (cart.items.length > 0) {
    createPreference();
  } else {
    loading.value = false;
  }
});
</script>

<template>
  <v-card class="pa-4" elevation="2">
    <h3 class="text-h6 mb-4 text-primary font-weight-bold">Resumen de Impacto y Pago</h3>
    
    <!-- Impact Section -->
    <div v-if="cart.items.length > 0" class="mb-6 bg-green-lighten-5 pa-4 rounded">
      <div class="d-flex align-center mb-3">
        <v-icon color="green" class="mr-2">mdi-leaf</v-icon>
        <span class="text-body-1">Contribución CO2 Total: <strong>{{ totalEmissions.toFixed(2) }} kg</strong></span>
      </div>
      
      <div v-if="uniqueCertifications.length > 0">
        <p class="text-body-2 mb-2 font-weight-bold">Sellos Ecológicos:</p>
        <div class="d-flex gap-2 flex-wrap">
          <v-tooltip v-for="cert in uniqueCertifications" :key="cert" top>
            <template v-slot:activator="{ props }">
              <div 
                v-bind="props"
                class="rounded-circle elevation-1 overflow-hidden bg-white d-flex align-center justify-center"
                style="width: 40px; height: 40px; border: 1px solid #eee;"
              >
                <img 
                  v-if="getSelloImg(cert)" 
                  :src="getSelloImg(cert)" 
                  :alt="cert" 
                  style="width: 100%; height: 100%; object-fit: cover;"
                />
                <v-icon v-else color="grey" size="small">mdi-check-decagram</v-icon>
              </div>
            </template>
            <span>{{ getSelloTitle(cert) }}</span>
          </v-tooltip>
        </div>
      </div>
    </div>

    <v-divider class="mb-4"></v-divider>

    <p class="mb-4 text-body-2">Selecciona tu método de pago preferido con Mercado Pago.</p>
    
    <div v-if="preferenceId" id="wallet_container"></div>

    <div v-if="initPoint" class="text-center mt-4">
      <v-btn color="primary" variant="outlined" :href="initPoint" target="_blank">Pagar en Mercado Pago</v-btn>
    </div>
    
    <div v-else-if="loading && cart.items.length > 0" class="d-flex justify-center pa-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    
    <div v-else-if="!cart.items.length" class="text-center text-error">
      No hay items en el carrito para pagar.
    </div>
    
    <div v-else class="text-center text-error">
      {{ errorMessage || 'Error al cargar la pasarela de pago.' }}
      <br>
      <v-btn size="small" color="primary" class="mt-2" @click="createPreference">Reintentar</v-btn>
    </div>
  </v-card>
</template>
