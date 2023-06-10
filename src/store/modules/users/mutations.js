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
  }
}
