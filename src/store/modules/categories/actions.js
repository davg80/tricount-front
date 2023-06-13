const BASE_URL = 'http://localhost:3333/api/v1'
import axios from 'axios'
import router from '../../../router'

export default {
  fetchCategories(context) {
    console.log('Categories')
    axios
      .get(`${BASE_URL}/categories`)
      .then((response) => {
        console.log('GET Categories')
        console.log(response.data)
        context.commit('setCategories', response.data.categories)
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  createCategorie(context, categories) {
    console.log(categories)
    axios
      .post(`${BASE_URL}/categories`, categories)
      .then((response) => {
        console.log(categories)
        context.commit('addNewCategorie', categories)
        context.commit('setTotalPriceCategories', response.data.categories)
        context.commit('setTotalAtMyExpenseCategories', response.data.categories)
        context.commit('auth/setMessages', response.data.msg)
        router.push({name: 'Transactions'})
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  updateCategorie(context, updatedCategorie) {
    console.log(updatedCategorie)
    axios
      .patch(`${BASE_URL}/categories/${updatedCategorie._id}`, updatedCategorie)
      .then((response) => {
        console.log('updated Categorie')
        console.log(response.data)
        context.commit('updatedCategorie', response.data.categories)
        context.commit('setTotalPriceCategories', response.data.categories)
        context.commit('setTotalAtMyExpenseCategories', response.data.categories)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  deleteCategorie(context, deleteCategorie) {
    console.log(deleteCategorie)
    axios
      .delete(`${BASE_URL}/categories/${deleteCategorie._id}`, deleteCategorie)
      .then((response) => {
        console.log('delete Categorie')
        context.commit('deleteCategorie', deleteCategorie)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        console.log(error)
        if (error) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  }
}
