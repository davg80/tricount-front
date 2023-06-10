<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const showMenu = ref(false)
const toggleNavbar = () => {
  showMenu.value = !showMenu.value
}
const isAuthenticated = computed(() => store.getters['auth/getUserIsAuthenticated'])
const isAdmin = computed(() => store.getters['auth/getUserIsAdmin'])
const logout = () => {
  store.dispatch('auth/logout')
  localStorage.clear()
}
</script>
<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div
        v-if="isAuthenticated"
        class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
      >
        <RouterLink
          :to="{ name: 'Home' }"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >Accueil</RouterLink
        >
        <button
          class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <RouterLink
              v-if="isAuthenticated"
              :to="{ name: 'Sendings' }"
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >Dépenses</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              v-if="isAuthenticated"
              :to="{ name: 'Balance' }"
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >Balance</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              v-if="isAuthenticated"
              :to="{ name: 'Attendees' }"
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >Participants</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              v-if="isAuthenticated && isAdmin"
              :to="{ name: 'Admin' }"
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >Admin</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              v-if="isAuthenticated"
              :to="{ name: 'Profile' }"
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              >Profile</RouterLink
            >
          </li>
          <span v-if="!isAuthenticated" class="flex">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'Login' }"
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >Se connecter</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'Register' }"
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                >S'inscrire</RouterLink
              >
            </li>
          </span>
          <li
            v-else
            class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
          >
            <a href="/" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
