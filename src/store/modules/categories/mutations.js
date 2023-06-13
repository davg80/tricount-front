export default {
    setCategories(state, categories) {
      console.log(categories)
      state.totalPriceCategories = state.categories.map(categorie => categorie.priceTotal).reduce((prev, curr) => prev + curr, 0)
      state.totalAtMyExpenseCategories = categories.map(categorie => categorie.atMyExpense).reduce((prev, curr) => prev + curr, 0)
      state.categories = categories
    },
    setTotalPriceCategories(state) {
      state.totalPriceCategories = state.categories.map(categorie => categorie.priceTotal).reduce((prev, curr) => prev + curr, 0)
    },
    setTotalAtMyExpenseCategories(state) {
      state.totalAtMyExpenseCategories = state.categories.map(categorie => categorie.atMyExpense).reduce((prev, curr) => prev + curr, 0)
    },
    setCount(state, count) {
      state.count = count
    },
    addNewCategorie(state, newCategorie) {
      state.categories.push(newCategorie)
    },
    updatedCategorie(state, updatedCategorie) {
      const oldCategories = state.categories
      const indexCategorie = oldCategories.findIndex((categorie) => categorie._id === updatedCategorie._id)
      state.categories.splice(indexCategorie, 1, updatedCategorie)
    },
    deleteCategorie(state, deletedCategorie) {
      state.categories.splice(state.categories.indexOf(deletedCategorie), 1)
    }
  }