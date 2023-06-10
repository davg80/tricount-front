import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  namespaced: true,
  state() {
    return {
      userIsLogged: false,
      userIsAdmin: false,
      logger: null,
      errorsForm: [],
      messages: null,
      viewAdmin: 'users'
    }
  },
  getters,
  actions,
  mutations
}
