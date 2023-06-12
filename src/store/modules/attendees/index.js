import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      attendees: [],
      count: 0,
      attendeesActifs: []
    }
  },
  getters,
  actions,
  mutations
}
