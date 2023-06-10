<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import InputComponent from '../../components/InputComponent.vue'

const store = useStore()

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const female = ref('')
const male = ref('')

const assignFirstname = (value) => (firstname.value = value)
const assignLastname = (value) => (lastname.value = value)
const assignEmail = (value) => (email.value = value)
const assignPassword = (value) => (password.value = value)

const handleSubmit = () => {
  const gender = male.value ? 'male' : 'female'
  console.log(firstname.value, lastname.value, email.value, password.value, gender)
  store.dispatch('auth/register', {
    firstname: email.value,
    lastname: password.value,
    gender: gender,
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <main>
    <h1 class="text-center font-semibold text-5xl mt-8">S'inscrire</h1>
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
        <InputComponent
          forLabel="email"
          label="Adresse mail :"
          typeInput="email"
          id="email"
          @input="assignEmail"
        />
        <div class="inline-flex items-center cursor-pointer mb-4">
          <label
            for="male"
            class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
            >Homme : </label
          >
          <input
            type="checkbox"
            id="male"
            v-model="male"
            class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
            style="transition: all 0.15s ease 0s"
          />
        </div>
        <div class="inline-flex items-center cursor-pointer mb-4">
          <label
            for="female"
            class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
            >Femme : </label
          >
          <input
            type="checkbox"
            id="female"
            v-model="female"
            class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
            style="transition: all 0.15s ease 0s"
          />
        </div>
        <InputComponent
          forLabel="password"
          label="Mot de passe :"
          typeInput="password"
          id="password"
          @input="assignPassword"
        />
        <button
          type="submit"
          class="bg-blue-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
        >
          Register
        </button>
      </form>
    </div>
  </main>
</template>
