<script setup>
import SidebarComponent from '../../components/SidebarComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const users = computed(() => store.getters.getUsers)
const attendees = computed(() => store.getters.getAttendees)
const view = computed(() => store.getters['auth/getViewAdmin'])

const editAction = ref(false)
const userFields = ref({ firstname: null, lastname: null, email: null })

const editUser = () => {
  editAction.value = true
}

const updatedUser = (oldUser) => {
  console.log(userFields)
  const user = {
    firstname: userFields.value.firstname ?? oldUser.firstname,
    lastname: userFields.value.lastname?? oldUser.lastname,
    email: userFields.value.email?? oldUser.email,
    _id: oldUser._id
  }
  console.log(user)
  store.dispatch('updateUser', user)
  editAction.value = false
}

const deleteUser = (user) => {
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
      <section class="block w-full overflow-x-auto m-14"></section>
      <section
        class="block w-full overflow-x-auto m-14"
        v-if="view === 'users' || view === undefined"
      >
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
                valider
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
                <input
                  v-if="editAction"
                  class="px-1 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-16"
                  :value="user.lastname"
                  @change="userFields.lastname = $event.target.value"
                />
                <span v-else>{{ user.lastname }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                  :value="user.firstname"
                  @change="userFields.firstname = $event.target.value"
                />
                <span v-else>{{ user.firstname }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                  :value="user.email"
                  @change="userFields.email = $event.target.value"
                />
                <span v-else>{{ user.email }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ user.role }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <button @click="updatedUser(user)">
                  <i class="fa-regular fa-circle-check" style="color: #0b8920; font-size: 20px"></i>
                </button>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <div class="flex flex-wrap w-14 justify-between items-center">
                  <div class="my-4">
                    <button @click="editUser(user)">
                      <i class="fa-solid fa-pen" style="color: #1685da; font-size: 18px"></i>
                    </button>
                  </div>
                  <div class="my-4">
                    <button @click="deleteUser(user)">
                      <i class="fa-solid fa-trash" style="color: #f00505; font-size: 18px"></i>
                    </button>
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
