<script setup>
// import { computed, onMounted } from 'vue'
// import { useStore } from 'vuex'
// const store = useStore()

// const categories = computed(() => store.getters.getCategories)
// const getAttendeesActifs = computed(() => store.getters.getAttendeesActifs)
// const transactions = computed(() => store.getters.getTransactions)
// const totalAtMyExpenseCategories = computed(() => store.getters.getTotalAtMyExpenseCategories)

// // Utils
// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }
// onMounted(() => {
//   store.dispatch('fetchAttendees')
//   store.dispatch('fetchCategories')
//   store.dispatch('fetchTransactions')
// })
</script>

<template>
  <div class="w-full flex justify-center bg-blue-200">
    <section class="block w-full overflow-x-auto m-14">
      <h1>Balance</h1>
    </section>
  </div>
</template>
