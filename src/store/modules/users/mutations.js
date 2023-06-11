export default {
  setUsers(state, users) {
    console.log("MUTATIONS")
    console.log(users)
    state.users = users
  },
  updatedUser(state, updatedUser) {
    const oldUsers = state.users
    const indexUser = oldUsers.findIndex((user) => user._id === updatedUser._id)
    state.users.splice(indexUser, 1, updatedUser)
  },
  deleteUser(state, deletedUser) {
    state.users.splice(state.users.indexOf(deletedUser), 1)
  }
}
