<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const attendees = computed(() => store.getters.getAttendees)
const transactions = computed(() => store.getters.getTransactions)
const categories = computed(() => store.getters.getCategories)
const totalPriceCategories = computed(() => store.getters.getTotalPriceCategories)
const totalAtMyExpenseCategories = computed(() => store.getters.getTotalAtMyExpenseCategories)

function getData() {
  const data = categories.value.reduce(function (r, a) {
    r[a._id] = r[a._id] || []
    r[a._id].push({
      attendeeId: a.attendee._id,
      firstname: a.attendee.firstname,
      lastname: a.attendee.lastname,
      priceTotal: a.priceTotal,
      atMyExpense: a.atMyExpense,
      name: a.name,
      description: a.description,
      motto: a.motto,
      transactions: transactions.value.filter((el) => el.category._id === a._id),
      sumAlreadyPayed: transactions.value
        .filter((el) => el.category._id === a._id)
        .reduce((acc, curr) => {
          return acc + curr.price
        }, 0),
      attendees: attendees
    })
    return r
  }, Object.create(null))
  return data
}

// // Utils
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
onMounted(() => {
  store.dispatch('fetchUsers')
  store.dispatch('fetchCategories')
  store.dispatch('fetchAttendees')
  store.dispatch('fetchTransactions')
  getData()
})
</script>
<template>
  <div class="w-full flex justify-center">
    <section class="block w-full overflow-x-auto m-14">
      <div>
        <div class="relative md:ml-64 bg-blueGray-100 w-max">
          <section class="block w-full overflow-x-auto m-14">
            <p class="text-xl font-bold mb-4">
              Total : {{ totalPriceCategories }} € | Total par personne :
              {{ totalAtMyExpenseCategories }} €
            </p>
            <ul>
              <li v-for="categories in getData()" :key="categories">
                <ul>
                  <li v-for="(category, index) in categories" :key="index">
                    <div
                      class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max mb-4"
                    >
                      <p>
                        {{ category.name }} : {{ category.description }}
                        {{ capitalizeFirstLetter(category.lastname) }} {{ category.firstname }} a
                        payé {{ category.priceTotal }} {{ category.motto }}. Le prix par personne
                        est de {{ category.atMyExpense }} {{ category.motto }}.
                      </p>
                      <ul>
                        <li
                          class="mb-4"
                          v-for="(transaction, index) in category.transactions"
                          :key="index"
                        >
                          <p class="font-bold mb-4" v-if="transaction">
                            {{ transaction.typeTransaction }} :
                            <span class="italic underline">{{ transaction.title }}</span>
                          </p>
                          <span class="pb-3"
                            >{{ transaction.attendee.lastname }}
                            {{ transaction.attendee.firstname }} a payé {{ transaction.price }}
                            {{ category.motto }}.</span
                          >
                          <p>
                            Il reste
                            {{ transaction.category.priceTotal - category.sumAlreadyPayed }}
                            {{ category.motto }}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
