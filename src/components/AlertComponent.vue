<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const messagesAuth = computed(() => {
  const messages = store.getters['auth/getMessages'];
  return messages
})
console.log(messagesAuth);
const errorsAuth = computed(() => {
  const errors = store.getters['auth/getErrors']
  return errors
})
console.log(errorsAuth);
</script>

<template>
  <div v-if="messagesAuth !== null" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-green-200 items-center text-bg-green-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Bravo</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ messagesAuth }}</span>
    </div>
  </div>
  <div v-if="errorsAuth !== null" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-red-200 items-center text-bg-red-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Erreur</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ errorsAuth.msg }}</span>
    </div>
  </div>
</template>

<!-- <template>
  <div v-if="messagesAuth" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-green-200 items-center text-bg-green-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Bravo</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ messagesAuth }}</span>
    </div>
  </div>
  <div v-if="errorsAuth.length > 0" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-red-200 items-center text-bg-red-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Erreur</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ errorsAuth.msg }}</span>
    </div>
  </div>
  <div v-if="messagesUser" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-green-200 items-center text-bg-green-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Bravo</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ messagesUser }}</span>
    </div>
  </div>
  <div v-if="errorsUser.length > 0" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-red-200 items-center text-bg-red-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Erreur</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ errorsUser.msg }}</span>
    </div>
  </div>
  <div v-if="messagesAttendees" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-green-200 items-center text-bg-green-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Bravo</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ messagesAttendees }}</span>
    </div>
  </div>
  <div v-if="errorsAttendees.length > 0" class="absolute left-1/2 -translate-x-1/2 top-12 z-20 text-center">
    <div
      class="p-2 bg-red-200 items-center text-bg-red-200 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3"
        >Erreur</span
      >
      <span class="font-semibold mr-2 text-left flex-auto">{{ errorsAttendees.msg }}</span>
    </div>
  </div>
</template> -->
