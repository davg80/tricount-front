<script setup>
import SidebarComponent from '../../components/sidebarComponent.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const users = computed(() => store.getters.getUsers);
const attendees = computed(() => store.getters.getAttendees)
console.log(users)

onMounted(() => {
  store.dispatch('fetchUsers')
  store.dispatch('fetchAttendees')
})
</script>

<template>
  <div>
    <SidebarComponent />
    <div class="relative md:ml-64 bg-blueGray-100">
      <p v-if="users.length === 0">Aucun utilisateurs de rôle user</p>
      <div v-else>Utilisateurs : {{ users }}</div>
      <p v-if="attendees.length === 0">Aucun participants</p>
      <div v-else>Participants :{{ attendees }}</div>
    </div>
  </div>
</template>
