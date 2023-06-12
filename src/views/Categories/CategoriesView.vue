<script setup>
import { onMounted, ref, computed } from 'vue'
import InputComponent from '../../components/InputComponent.vue'
import { useStore } from 'vuex'

const store = useStore()
const name = ref('')
const motto = ref('')
const description = ref('')
const price = ref('')
const payor = ref('')
const mottos = ['$', '€', '¥', '£']

const assignName = (value) => (name.value = value)
const assignDescription = (value) => (description.value = value)
const assignPriceTotal = (value) => (price.value = value)
const attendees = computed(() => store.getters.getAttendees)

const attendeesActifs = computed(() => attendees.value.filter((attendee) => attendee.status === true))

const handleSubmit = () => {
  console.log(name.value, description.value, motto.value, price.value, payor.value, localStorage.getItem('userId'))
  store.dispatch('createCategorie', {
    name:name.value,
    description:description.value,
    motto: motto.value,
    priceTotal: parseInt(price.value),
    atMyExpense: parseInt(parseInt(price.value)/attendeesActifs.value.length).toFixed(2),
    attendee: payor.value,
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
                    <h6 class="text-white text-sm font-bold">Catégorie</h6>
                  </div>
                  <hr class="mt-6 border-b-1 border-white-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div class="text-white text-center mb-3 font-bold">
                    <small v-if="attendeesActifs.length > 0">Créer une catégorie de dépense</small>
                    <small v-else>Vous devez créer ou avoir des participants actifs.Pensez à vous créer.</small>
                  </div>
                  <form v-if="attendeesActifs.length > 0" @submit.prevent="handleSubmit">
                    <div class="relative w-full mb-3">
                      <InputComponent forLabel="name" label="Nom :" id="name" @input="assignName" />
                      <div class="flex my-4">
                        <label
                          for="participants"
                          class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
                          >Devise :
                        </label>
                        <select
                          v-model="motto"
                          class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max w-full"
                        >
                          <option disabled value="">Choisir ta devise :</option>
                          <option v-for="(motto, index) in mottos" :key="index" :value="motto">
                            {{ motto }}
                          </option>
                        </select>
                      </div>
                      <InputComponent
                        forLabel="description"
                        label="Description :"
                        id="description"
                        @input="assignDescription"
                      />
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
                            {{ attendee.firstname }}
                          </option>
                        </select>
                      </div>
                      <InputComponent
                        forLabel="price"
                        typeInput="number"
                        label="Prix :"
                        id="price"
                        @input="assignPriceTotal"
                      />
                    </div>

                    <div class="text-center mt-6">
                      <button
                        type="submit"
                        class="bg-blue-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      >
                        Ajouter une nouvelle catégorie
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
