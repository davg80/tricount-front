<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const users = computed(() => store.getters.getUsers);
console.log(users)

onMounted(() => {
  store.dispatch('fetchUsers')
})
</script>

<template>
  <div>Utilisateurs</div>
  {{  users }}
</template>
