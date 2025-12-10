import api from "./api";





api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally: expired/invalid token, missing auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const backendMsg = error?.response?.data?.msg || error?.response?.data?.error;

    if (status === 401 || status === 422) {
      // Clear stale credentials so UI reflects logged-out state
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Normalize error message for callers
      const normalized = backendMsg || "Sesión inválida o expirada. Inicia sesión como administrador e intenta nuevamente.";
      if (error.response && error.response.data) {
        error.response.data.error = normalized;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
