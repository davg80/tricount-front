export default {
  getTransactions: (state) => state.transactions,
  getTransactionsByAttendee: (state) => (id) => {
    return state.transactions.find((transation) => transation.attendee._id === id)
  }
}
