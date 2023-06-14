import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      categories: [],
      totalPriceCategories: 0,
      totalAtMyExpenseCategories: 0,
    }
  },
  getters,
  actions,
  mutations
}
