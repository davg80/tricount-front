<script setup>
import SidebarComponent from '../../components/SidebarComponent.vue'
import AlertComponent from '../../components/AlertComponent.vue'
import InputComponent from '../../components/InputComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const users = computed(() => store.getters.getUsers)
const attendees = computed(() => store.getters.getAttendees)
const categories = computed(() => store.getters.getCategories)
const transactions = computed(() => store.getters.getTransactions)
const totalPriceCategories = computed(() => store.getters.getTotalPriceCategories)
const totalAtMyExpenseCategories = computed(() => store.getters.getTotalAtMyExpenseCategories)
const view = computed(() => store.getters['auth/getViewAdmin'])
const editAction = ref(false)
const createAction = ref(false)
const userFields = ref({ firstname: null, lastname: null, email: null })
const attendeeFields = ref({ firstname: null, lastname: null, status: null })
const categorieFields = ref({
  name: null,
  description: null,
  motto: null,
  atMyExpense: null,
  priceTotal: null,
  payor: null
})
const transactionFields = ref({
  title: null,
  price: null,
  typeTransaction: null,
  attendee: null,
  category: null,
  user: null
})

// USERS
const editUser = () => {
  editAction.value = true
}
const createUser = () => {
  createAction.value = !createAction.value
}
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
  store.dispatch('createUser', {
    firstname: firstname.value,
    lastname: lastname.value,
    gender: gender,
    email: email.value,
    password: password.value
  })
  createAction.value = false
}
const updatedUser = (oldUser) => {
  console.log(userFields)
  const user = {
    firstname: userFields.value.firstname ?? oldUser.firstname,
    lastname: userFields.value.lastname ?? oldUser.lastname,
    email: userFields.value.email ?? oldUser.email,
    role: oldUser.role,
    _id: oldUser._id
  }
  console.log(user)
  store.dispatch('updateUser', user)
  editAction.value = false
}

const deleteUser = (user) => {
  store.dispatch('deleteUser', user)
}

// ATTENDEES
const editAttendee = () => {
  editAction.value = true
}

const updatedAttende = (oldAttendee) => {
  console.log(attendeeFields)
  const attendee = {
    firstname: attendeeFields.value.firstname ?? oldAttendee.firstname,
    lastname: attendeeFields.value.lastname ?? oldAttendee.lastname,
    status: (attendeeFields.value.status === 'true' ? true : false) ?? oldAttendee.status,
    _id: oldAttendee._id
  }
  console.log(attendee)
  store.dispatch('updateAttendee', attendee)
  editAction.value = false
}

const deleteAttendee = (user) => {
  store.dispatch('deleteAttendee', user)
}

// CATEGORIE
const editCategorie = () => {
  editAction.value = true
}

const updatedCategorie = (oldCategorie) => {
  console.log(oldCategorie)
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

//TRANSACTIONS
const editTransaction = () => {
  editAction.value = true
}

const updatedTransaction = (oldTransaction) => {
  console.log(oldTransaction)
  console.log(transactionFields)
  const transaction = {
    title: transactionFields.value.title ?? oldTransaction.title,
    typeTransaction: transactionFields.value.typeTransaction ?? oldTransaction.typeTransaction,
    price: transactionFields.value.price ?? oldTransaction.price,
    attendee: transactionFields.value.attendee ?? oldTransaction.attendee,
    user: localStorage.getItem('userId'),
    category: transactionFields.value.category ?? oldTransaction.category._id,
    _id: oldTransaction._id
  } 
  console.log(transaction);
  store.dispatch('updateTransaction', transaction)
  editAction.value = false
}

const deleteTransaction = (transaction) => {
  console.log(transaction)
  store.dispatch('deleteTransaction', transaction)
}

onMounted(() => {
  store.dispatch('fetchUsers')
  store.dispatch('fetchAttendees')
  store.dispatch('auth/newViewAdmin')
  store.dispatch('fetchCategories')
  store.dispatch('fetchTransactions')
})
</script>

<template>
  <div>
    <SidebarComponent />
    <AlertComponent />
    <div class="relative md:ml-64 bg-blueGray-100 w-max">
      <!-- Users -->
      <section
        class="block w-full overflow-x-auto m-14"
        v-if="view === 'users' || view === undefined"
      >
        <div class="my-4" v-if="users.length === 0">
          <p>Aucun utilisateurs avec le rôle user</p>
          <button @click="createUser()">
            <i class="fa-solid fa-circle-plus" style="color: #5d92ee"></i>
          </button>
        </div>
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
                Prénom
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Email
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                role
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
            <tr v-for="user in users" :key="user._id">
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-1 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-16"
                  :value="user.lastname"
                  @change="userFields.lastname = $event.target.value"
                />
                <span v-else>{{ user.lastname }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                  :value="user.firstname"
                  @change="userFields.firstname = $event.target.value"
                />
                <span v-else>{{ user.firstname }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                  :value="user.email"
                  @change="userFields.email = $event.target.value"
                />
                <span v-else>{{ user.email }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                {{ user.role }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <button @click="updatedUser(user)">
                  <i class="fa-regular fa-circle-check" style="color: #0b8920; font-size: 20px"></i>
                </button>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <div class="flex flex-wrap w-14 justify-between items-center">
                  <div class="my-4">
                    <button @click="createUser()">
                      <i class="fa-solid fa-circle-plus" style="color: #5d92ee"></i>
                    </button>
                  </div>
                  <div class="my-4">
                    <button @click="editUser()">
                      <i class="fa-solid fa-pen" style="color: #1685da; font-size: 18px"></i>
                    </button>
                  </div>
                  <div class="my-4">
                    <button @click="deleteUser(user)">
                      <i class="fa-solid fa-trash" style="color: #f00505; font-size: 18px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- CreateUser -->
      <section class="block w-full overflow-x-auto m-14" v-if="view === 'users' || view === undefined" >
        <form @submit.prevent="handleSubmit" v-if="createAction" class="w-full p-4">
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
            <div class="relative w-full mb-3">
              <InputComponent
                forLabel="email"
                label="Adresse mail :"
                typeInput="email"
                id="email"
                @input="assignEmail"
              />
            </div>
            <div class="inline-flex items-center cursor-pointer mb-4">
              <label
                for="male"
                class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
                >Homme :
              </label>
              <input
                type="checkbox"
                id="male"
                v-model="male"
                class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5 mr-3"
                style="transition: all 0.15s ease 0s"
              />
            </div>
            <div class="inline-flex items-center cursor-pointer mb-4">
              <label
                for="female"
                class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
                >Femme :
              </label>
              <input
                type="checkbox"
                id="female"
                v-model="female"
                class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                style="transition: all 0.15s ease 0s"
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
                Créer un utilisateur
              </button>
            </div>
          </form>
      </section>
      <!-- Attendees -->
      <section class="block w-full overflow-x-auto m-14" v-if="view === 'attendees'">
        <p v-if="attendees.length === 0">Aucun participants</p>
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
                Prénom
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                status
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
            <tr v-for="attendee in attendees" :key="attendee._id">
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-1 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-16"
                  :value="attendee.firstname"
                  @change="attendeeFields.firstname = $event.target.value"
                />
                <span v-else>{{ attendee.firstname }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                  :value="attendee.lastname"
                  @change="attendeeFields.lastname = $event.target.value"
                />
                <span v-else>{{ attendee.lastname }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                  :value="attendee.status"
                  @change="attendeeFields.status = $event.target.value"
                />
                <span v-else>{{ attendee.status }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <button @click="updatedAttende(attendee)">
                  <i class="fa-regular fa-circle-check" style="color: #0b8920; font-size: 20px"></i>
                </button>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <div class="flex flex-wrap w-14 justify-between items-center">
                  <div class="my-4">
                    <button @click="editAttendee()">
                      <i class="fa-solid fa-pen" style="color: #1685da; font-size: 18px"></i>
                    </button>
                  </div>
                  <div class="my-4">
                    <button @click="deleteAttendee(attendee)">
                      <i class="fa-solid fa-trash" style="color: #f00505; font-size: 18px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- Categories -->
      <section class="block w-full overflow-x-auto m-14" v-if="view === 'categories'">
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
                <span v-else><i class="fa-regular fa-circle-check" style="color: #7e7c7c; font-size: 20px"></i></span>
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
      <!-- Transactions -->
      <section class="block w-full overflow-x-auto m-14" v-if="view === 'transactions'">
        <p v-if="transactions.length === 0">Aucune transaction</p>
        <table v-else class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Titre
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Prix
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Type de transaction
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Catégorie
              </th>
              <th
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Payeur
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
            <tr v-for="transaction in transactions" :key="transaction._id">
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-1 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-16"
                  :value="transaction.title"
                  @change="transactionFields.title = $event.target.value"
                />
                <span v-else>{{ transaction.title }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-1 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-16"
                  :value="transaction.price"
                  @change="transactionFields.price = $event.target.value"
                />
                <span v-else>{{ transaction.price }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <input
                  v-if="editAction"
                  class="px-1 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-22"
                  :value="transaction.typeTransaction"
                  @change="transactionFields.typeTransaction = $event.target.value"
                />
                <span v-else>{{ transaction.typeTransaction }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <select
                  v-if="editAction"
                  v-model="transactionFields.category"
                  class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max w-full"
                >
                  <option disabled value="">Choisir la categorie :</option>
                  <option
                    v-for="categorie in categories"
                    :key="categorie._id"
                    :value="categorie._id"
                  >
                    {{ categorie.name }}
                  </option>
                </select>
                <span>{{ transaction.category.name }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <span>{{ transaction.attendee.firstname }} {{ transaction.attendee.lastname }}</span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <button @click="updatedTransaction(transaction)" v-if="editAction">
                  <i class="fa-regular fa-circle-check" style="color: #0b8920; font-size: 20px"></i>
                </button>
                <span v-else><i class="fa-regular fa-circle-check" style="color: #7e7c7c; font-size: 20px"></i></span>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2"
              >
                <div class="flex flex-wrap w-14 justify-between items-center">
                  <div class="my-4">
                    <button @click="editTransaction()">
                      <i class="fa-solid fa-pen" style="color: #1685da; font-size: 18px"></i>
                    </button>
                  </div>
                  <div class="my-4">
                    <button @click="deleteTransaction(transaction)">
                      <i class="fa-solid fa-trash" style="color: #f00505; font-size: 18px"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
