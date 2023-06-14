const BASE_URL = 'http://localhost:3333/api/v1'
import axios from 'axios'

export default {
  fetchTransactions(context) {
    console.log('Transactions')
    axios
      .get(`${BASE_URL}/transactions`)
      .then((response) => {
        console.log('GET Transactions')
        console.log(response.data)
        context.commit('setTransactions', response.data.transactions)
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  createTransaction(context, transactions) {
    console.log(transactions);
    axios
      .post(`${BASE_URL}/transactions`, transactions)
      .then((response) => {
        console.log(transactions);
        context.commit('addNewTransaction', transactions)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  updateTransaction(context, updatedTransaction) {
    console.log(updatedTransaction)
    const transaction = context.state.transactions.find(
      (transaction) => transaction._id === updatedTransaction._id
    )
    console.log(transaction)
    axios
      .patch(`${BASE_URL}/transactions/${updatedTransaction._id}`, updatedTransaction)
      .then((response) => {
        console.log('updated Transaction')
        console.log(response.data)
        context.commit('updatedTransaction', response.data.transactions)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  },
  deleteTransaction(context, deleteTransaction) {
    console.log(deleteTransaction)
    axios
      .delete(`${BASE_URL}/transactions/${deleteTransaction._id}`, deleteTransaction)
      .then((response) => {
        console.log('delete Transaction')
        context.commit('deleteTransaction', deleteTransaction)
        context.commit('auth/setMessages', response.data.msg)
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          context.commit('auth/setErrorsForm', error.response.data)
        }
      })
  }
}
