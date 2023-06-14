<script setup>
import { onMounted, ref, computed } from 'vue'
import InputComponent from '../../components/InputComponent.vue'
import { useStore } from 'vuex'

const store = useStore()
const title = ref('')
const price = ref('')
const payor = ref('')
const categorie = ref('')
const transactionType = ref('')
const transactionsType = ['Dépenses', 'Rentrée argent', 'Transfert argent']

const assignTitle = (value) => (title.value = value)
const assignPrice = (value) => (price.value = value)
const attendees = computed(() => store.getters.getAttendees)
const categories = computed(() => store.getters.getCategories)

const attendeesActifs = computed(() =>
  attendees.value.filter((attendee) => attendee.status === true)
)

const handleSubmit = () => {
  console.log(title.value, payor.value, price.value, transactionType.value, categorie.value)
  console.log(typeof transactionType.value);
  store.dispatch('createTransaction', {
    title: title.value,
    price: price.value,
    typeTransaction: transactionType.value,
    attendee: payor.value,
    category: categorie.value,
    user: localStorage.getItem('userId')
  })
}

onMounted(() => {
  store.dispatch('fetchAttendees')
})
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
                    <h6 class="text-white text-sm font-bold">Transactions</h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-white-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-white text-center mb-3 font-bold">
                    <small v-if="attendeesActifs.length > 0 && categories.length > 0">Créer une transaction</small>
                    <small v-else
                      >Vous devez créer ou avoir des participants actifs, et avoir au moins 1 catégorie.</small
                    >
                  </div>
                  <form v-if="attendeesActifs.length > 0 && categories.length > 0" @submit.prevent="handleSubmit">
                    <div class="relative w-full mb-3">
                      <InputComponent
                        forLabel="title"
                        label="Titre :"
                        id="title"
                        @input="assignTitle"
                      />
                      <InputComponent
                        forLabel="price"
                        typeInput="number"
                        label="Prix :"
                        id="price"
                        @input="assignPrice"
                      />
                      <div class="flex my-4">
                        <label
                          for="participants"
                          class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
                          >Transaction :
                        </label>
                        <select
                          v-model="transactionType"
                          class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max w-full"
                        >
                          <option disabled value="">Choisir ta transaction :</option>
                          <option
                            v-for="(transaction, index) in transactionsType"
                            :key="index"
                            :value="transaction"
                          >
                            {{ transaction }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="flex my-4">
                      <label
                        for="participants"
                        class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
                        >Payeur :
                      </label>
                      <select
                        v-model="payor"
                        class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max w-full"
                      >
                        <option disabled value="">Choisir le payeur :</option>
                        <option
                          v-for="attendee in attendeesActifs"
                          :key="attendee._id"
                          :value="attendee._id"
                        >
                          {{ attendee.lastname }}
                        </option>
                      </select>
                    </div>
                    <div class="flex my-4">
                      <label
                        for="categories"
                        class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
                        >Catégories :
                      </label>
                      <select
                        v-model="categorie"
                        class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max w-full"
                      >
                        <option disabled value="">Choisir la catégorie :</option>
                        <option
                          v-for="categorie in categories"
                          :key="categorie._id"
                          :value="categorie._id"
                        >
                          {{ categorie.name }}
                        </option>
                      </select>
                    </div>
                    <div class="text-center mt-6">
                      <button
                        type="submit"
                        class="bg-blue-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      >
                        Valider la transaction
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
