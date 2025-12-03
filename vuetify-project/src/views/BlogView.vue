<script setup>
import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogView from '../views/BlogView.vue';
import SellosView from '../views/SellosView.vue';
import Navbar from '@/components/Navbar.vue';


  </script>

<template>
  <v-container>
    <BlogPost />
    <Footer /> 
  </v-container>
</template>

<style scoped>
</style>