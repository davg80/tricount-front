export default {
    setErrorsForm(state, error) {
        state.errorsForm = error
        state.errors = true
        setTimeout(() => {
          state.errorsForm = ''
        }, 3000)
      },
      setLogger(state, logger) {
        state.logger = logger
        if (state.logger !== null) {
          state.userIsLogged = true
        }
      },
      setMessages(state, msg) {
        state.messages = msg
        setTimeout(() => {
          state.messages = ''
        }, 3000)
      },
      setIsAdmin(state, role) {
        state.userIsAdmin = role === 'admin'
      }
}