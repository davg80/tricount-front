export default {
    setErrorsForm(state, error) {
        state.errorsForm = error
        setTimeout(() => {
          state.errorsForm = null
        }, 3000)
      },
      setLogger(state, logger) {
        console.log(logger);
        state.logger = logger
        state.userIsLogged = (state.logger !== null) ? true : false
      },
      setMessages(state, msg) {
        state.messages = msg
        setTimeout(() => {
          state.messages = null
        }, 3000)
      },
      setIsAdmin(state, role) {
        state.userIsAdmin = role === 'admin'
      },
      setViewAdmin(state, newView) {
        console.log(newView);
        state.viewAdmin = newView
      }
}