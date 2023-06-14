export default {
    getCategories: (state) => state.categories,
    getSingleCategorie: (state) => (id) =>  state.categories.filter((categorie) => categorie.id === id),
    getTotalPriceCategories: (state) => state.totalPriceCategories,
    getTotalAtMyExpenseCategories: (state) => state.totalAtMyExpenseCategories,
}