<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import InputComponent from '../../components/InputComponent.vue';

const store = useStore()

const email = ref('')
const password = ref('')

const assignEmail = (value) => email.value = value
const assignPassword = (value) => password.value = value

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
  <main>
    <h1 class="text-center font-semibold text-5xl mt-8">Se connecter</h1>
    <div
      class="relative pt-16 pb-32 flex content-center items-center justify-center"
      style="min-height: 75vh"
    >
      <form @submit.prevent="handleSubmit">
        <InputComponent 
        forLabel="email"  
        label="Adresse mail :"
        typeInput="email"  
        id="email"  
        @input="assignEmail"  
        />
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
          Login
        </button>
      </form>
    </div>
  </main>
</template>
