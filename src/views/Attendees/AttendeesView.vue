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
  <div>
    <main>
      <section class="absolute w-full h-full">
        <div class="absolute top-0 w-full h-full bg-gray-900"></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-500 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-white text-sm font-bold">Ajouter un participant</h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-white-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form @submit.prevent="handleSubmit">
                    <div class="relative w-full mb-3">
                      <InputComponent
                        forLabel="firstname"
                        label="Nom :"
                        id="firstname"
                        @input="assignFirstname"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <InputComponent
                        forLabel="lastname"
                        label="Prénom :"
                        id="lastname"
                        @input="assignLastname"
                      />
                    </div>
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
                        style="transition: all 0.15s ease 0s"
                      />
                    </div>
                    <div class="text-center mt-6">
                      <button
                        type="submit"
                        class="bg-blue-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      >
                        S'inscrire
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<!-- <template>
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
</template> -->
