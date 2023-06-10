export default {
  setUsers(state, users) {
    console.log("MUTATIONS")
    console.log(users)
    state.users = users
  },
  setMessages(state, msg) {
    state.messages = msg
    setTimeout(() => {
      state.messages = ''
    }, 3000)
  },
  setErrorsForm(state, error) {
    state.errorsForm = error
    state.errors = true
    setTimeout(() => {
      state.errorsForm = ''
    }, 3000)
  },
  updatedUser(state, updatedUser) {
    const oldUsers = state.users
    const indexUser = oldUsers.findIndex((user) => user._id === updatedUser._id)
    state.users.splice(indexUser, 1, updatedUser)
  },
  deleteUser(state, deletedUser) {
    state.users.splice(state.users.indexOf(deletedUser), 1)
  }
}
