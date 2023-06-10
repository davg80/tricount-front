<script setup>
import SidebarComponent from '../../components/SidebarComponent.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const users = computed(() => store.getters.getUsers)
const attendees = computed(() => store.getters.getAttendees)
const view = computed(() => store.getters['auth/getViewAdmin'])

const updateUser = (user) => {
  console.log('update User', user);
  store.dispatch('updateUser', user)
}

const deleteUser = (user) => {  
  console.log('delete User', user);
  store.dispatch('deleteUser', user)
}

onMounted(() => {
  store.dispatch('fetchUsers')
  store.dispatch('fetchAttendees')
  store.dispatch('auth/newViewAdmin')
})
</script>

<template>
  <div>
    <SidebarComponent />
    <div class="relative md:ml-64 bg-blueGray-100">
      <section class="block w-full overflow-x-auto m-14" v-if="view === 'users' ||view === undefined">
        <p v-if="users.length === 0">Aucun utilisateurs de rôle user</p>
        <table v-else class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Nom
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Prénom
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Email
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                role
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ user.lastname }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ user.firstname }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ user.email }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ user.role }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <div class="flex flex-wrap w-14 justify-between items-center">
                  <div class="my-4">
                    <button @click="updateUser(user)"><i class="fa-solid fa-pen" style="color: #1685da"></i></button>
                  </div>
                  <div class="my-4">
                    <button @click="deleteUser(user)"><i class="fa-solid fa-trash" style="color: #f00505"></i></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="block w-full overflow-x-auto m-14" v-if="view === 'attendees'">
        <p v-if="attendees.length === 0">Aucun participants</p>
        <table v-else class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Nom
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Prénom
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                status
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attendee in attendees" :key="attendee._id">
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ attendee.lastname }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ attendee.firstname }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ attendee.status }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <div class="flex flex-wrap w-14 justify-between items-center">
                  <div class="my-4">
                    <button><i class="fa-solid fa-pen" style="color: #1685da"></i></button>
                  </div>
                  <div class="my-4">
                    <button><i class="fa-solid fa-trash" style="color: #f00505"></i></button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
