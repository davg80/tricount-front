export default {
    setCategories(state, categories) {
      console.log(categories)
      state.categories = categories
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