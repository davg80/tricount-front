<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import InputComponent from '../../components/InputComponent.vue'

const store = useStore()

const email = ref('')
const password = ref('')

const assignEmail = (value) => (email.value = value)
const assignPassword = (value) => (password.value = value)

const handleSubmit = () => {
  try {
    store.dispatch('auth/login', {
      email: email.value,
      password: password.value
    })
  } catch (error) {
    console.log(error)
  }
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
                    <h6 class="text-white text-sm font-bold">Se connecter</h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-white-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-white text-center mb-3 font-bold">
                    <small>Bienvenue sur le clone de Tricount</small>
                  </div>
                  <form @submit.prevent="handleSubmit">
                    <div class="relative w-full mb-3">
                      <InputComponent
                        forLabel="email"
                        label="Adresse mail :"
                        typeInput="email"
                        id="email"
                        @input="assignEmail"
                      />
                    </div>
                    <div class="relative w-full mb-3">
                      <InputComponent
                        forLabel="password"
                        label="Mot de passe :"
                        typeInput="password"
                        id="password"
                        @input="assignPassword"
                      />
                    </div>
                    <div class="text-center mt-6">
                      <button
                        type="submit"
                        class="bg-blue-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      >
                        Se connecter
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
