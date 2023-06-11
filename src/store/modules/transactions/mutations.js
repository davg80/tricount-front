export default {
    setTransactions(state, transactions) {
      console.log(transactions)
      state.transactions = transactions
    },
    setCount(state, count) {
      state.count = count
    },
    addNewTransaction(state, newTransaction) {
      state.transactions.push(newTransaction)
    },
    updatedTransaction(state, updatedTransaction) {
      const oldTransactions = state.transactions
      const indexTransaction = oldTransactions.findIndex((categorie) => categorie._id === updatedTransaction._id)
      state.transactions.splice(indexTransaction, 1, updatedTransaction)
    },
    deleteTransaction(state, deletedTransaction) {
      state.transactions.splice(state.transactions.indexOf(deletedTransaction), 1)
    }
  }