<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const categories = computed(() => store.getters.getCategories)
const editAction = ref(false)
const getAttendeesActifsByLogger = computed(() => store.getters.getCountAttendees)
const totalPriceCategories = computed(() => store.getters.getTotalPriceCategories)
const totalAtMyExpenseCategories = computed(() => store.getters.getTotalAtMyExpenseCategories)
const categorieFields = ref({
  name: null,
  description: null,
  motto: null,
  atMyExpense: null,
  priceTotal: null,
  payor: null
})
// CATEGORIE
const editCategorie = () => {
  editAction.value = true
}

const updatedCategorie = (oldCategorie) => {
  console.log(oldCategorie)
  console.log(getAttendeesActifsByLogger.value)
  const categorie = {
    name: categorieFields.value.name ?? oldCategorie.name,
    description: categorieFields.value.description ?? oldCategorie.description,
    motto: categorieFields.value.motto ?? oldCategorie.motto,
    priceTotal: categorieFields.value.priceTotal ?? oldCategorie.priceTotal,
    attendee: oldCategorie.attendee._id,
    user: localStorage.getItem('userId'),
    _id: oldCategorie._id
  }
  store.dispatch('updateCategorie', categorie)
  editAction.value = false
}

const deleteCategorie = (categorie) => {
  console.log(categorie)
  store.dispatch('deleteCategorie', categorie)
}
onMounted(() => {
  store.dispatch('fetchAttendees')
  store.dispatch('fetchCategories')
})
</script>
<template>
  <div class="w-full flex justify-center bg-blue-200">
    <!-- Categories -->
    <section class="block w-full overflow-x-auto m-14">
      <p v-if="categories.length === 0">Aucune catégories</p>
      <table v-else class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Nom
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              description
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              Devise
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              prix total
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              A charge par personne
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              payeur
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              valider
            </th>
            <th
              class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(categorie, index) in categories" :key="index">
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <input
                v-if="editAction"
                class="px-1 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-16"
                :value="categorie.name"
                @change="categorieFields.lastname = $event.target.value"
              />
              <span v-else>{{ categorie.name }}</span>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <input
                v-if="editAction"
                class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                :value="categorie.description"
                @change="categorieFields.description = $event.target.value"
              />
              <span v-else>{{ categorie.description }}</span>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <input
                v-if="editAction"
                class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                :value="categorie.motto"
                @change="categorieFields.motto = $event.target.value"
              />
              <span v-else>{{ categorie.motto }}</span>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <input
                v-if="editAction"
                class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                :value="categorie.priceTotal"
                @change="categorieFields.priceTotal = $event.target.value"
              />
              <span v-else>{{ categorie.priceTotal }} {{ categorie.motto }}</span>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <span>{{ categorie.atMyExpense }} {{ categorie.motto }}</span>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <span>{{ categorie.attendee.firstname }} {{ categorie.attendee.lastname }}</span>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <button @click="updatedCategorie(categorie)" v-if="editAction">
                <i class="fa-regular fa-circle-check" style="color: #0b8920; font-size: 20px"></i>
              </button>
              <span v-else
                ><i class="fa-regular fa-circle-check" style="color: #7e7c7c; font-size: 20px"></i
              ></span>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
            >
              <div class="flex flex-wrap w-14 justify-between items-center">
                <div class="my-4">
                  <button @click="editCategorie()">
                    <i class="fa-solid fa-pen" style="color: #1685da; font-size: 18px"></i>
                  </button>
                </div>
                <div class="my-4">
                  <button @click="deleteCategorie(categorie)">
                    <i class="fa-solid fa-trash" style="color: #f00505; font-size: 18px"></i>
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="text-xs">Total</td>
            <td class="pl-4">{{totalPriceCategories}} €</td>
            <td class="pl-4">{{ totalAtMyExpenseCategories }} €</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
