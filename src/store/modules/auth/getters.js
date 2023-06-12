export default {
    getErrors: (state) => state.errorsForm,
    getMessages: (state) => state.messages,
    getLogger: (state) => state.logger,
    getUserIsAuthenticated: (state) => state.userIsLogged && state,
    getUserIsAdmin: (state) => state.userIsAdmin,
    getViewAdmin: (state) => state.viewAdmin
}