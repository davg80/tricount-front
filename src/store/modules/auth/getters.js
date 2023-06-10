export default {
    getErrors: (state) => state.errorsForm,
    getMessages: (state) => state.messages,
    getLogger: (state) => state.logger,
    getUserIsAuthenticated: (state) => state.userIsLogged,
    getUserIsAdmin: (state) => state.userIsAdmin,
    getViewAdmin: (state) => state.viewAdmin
}