export default {
    setCategories(state, categories) {
      console.log(categories)
      state.categories = categories
    },
    setMessages(state, msg) {
      state.messages = msg
      setTimeout(() => {
        state.messages = ''
      }, 3000)
    },
    setCount(state, count) {
      state.count = count
    },
    setErrorsForm(state, error) {
      state.errorsForm = error
      state.errors = true
      setTimeout(() => {
        state.errorsForm = []
      }, 3000)
    },
    addNewCategorie(state, newCategorie) {
      state.categories.push(newCategorie)
    },
    updatedCategorie(state, updatedCategorie) {
      const oldCategories = state.categorie
      const indexCategorie = oldCategories.findIndex((categorie) => categorie._id === updatedCategorie._id)
      state.categories.splice(indexCategorie, 1, updatedCategorie)
    },
    deleteCategorie(state, deletedCategorie) {
      state.categories.splice(state.categorie.indexOf(deletedCategorie), 1)
    }
  }