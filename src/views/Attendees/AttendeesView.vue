<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import InputComponent from '../../components/InputComponent.vue'

const store = useStore()

const firstname = ref('')
const lastname = ref('')
const status = ref(false)
const getLogger = computed(() => store.getters['auth/getLogger'])
const userId = ref(getLogger.value._id)

const assignFirstname = (value) => (firstname.value = value)
const assignLastname = (value) => (lastname.value = value)

const handleSubmit = () => {
  console.log(firstname.value, lastname.value, status.value)
  store.dispatch('createAttendee', {
    firstname: firstname.value,
    lastname: lastname.value,
    status: status.value,
    user: userId.value
  })
}
</script>

<template>
  <main>
    <h1>Participants</h1>
    <div
      class="relative pt-16 pb-32 flex content-center items-center justify-center"
      style="min-height: 75vh"
    >
      <form @submit.prevent="handleSubmit">
        <InputComponent
          forLabel="firstname"
          label="Nom :"
          id="firstname"
          @input="assignFirstname"
        />
        <InputComponent
          forLabel="lastname"
          label="Prénom :"
          id="lastname"
          @input="assignLastname"
        />
        <div class="inline-flex items-center cursor-pointer mb-4">
          <label
            for="status"
            class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
            >Statut: (actif / non-actif)</label
          >
          <input
            type="checkbox"
            id="status"
            v-model="status"
            class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
            style="transition: all 0.15s ease 0s;"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
        >
          Valider
        </button>
      </form>
    </div>
  </main>
</template>
