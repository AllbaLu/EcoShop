import { defineStore } from "pinia";
import api from "../api_auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),

  actions: {
    async login(email, password) {
      const res = await api.post("/login", { email, password });

      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log('✅ Login successful:', {
        user: this.user,
        role: this.user.role
      })

      return res.data;
    },

    async register(name, email, password) {
      const res = await api.post("/register", { name, email, password });
      return res.data;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
