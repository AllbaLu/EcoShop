import { defineStore } from "pinia";
import api from "../api_auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),

  actions: {
    async login(email, password) {
      const res = await api.post("/login", { email, password });

      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);

      return res.data;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
