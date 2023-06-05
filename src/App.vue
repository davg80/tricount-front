<script setup>
import NavBar from './components/NavbarComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>
