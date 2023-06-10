const BASE_URL = 'http://localhost:3333/api/v1'
import axios from 'axios'

export default {
  fetchUsers(context) {
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => {
        console.log('GET Users')
        console.log(response.data)
        context.commit('setUsers', response.data.user)
        context.commit('setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('setErrorsForm', error.response.data)
        }
      })
  },
  updateUser(context, updatedUser) {
    console.log(updatedUser)
    const user = context.state.users.find((user) => user._id === updatedUser._id)
    console.log(user);
    axios
      .patch(`${BASE_URL}/users/update-user/${updatedUser._id}`, updatedUser)
      .then((response) => {
        console.log('Update Users')
        console.log(response.data)
        context.commit('updatedUser', updatedUser)
        context.commit('setMessages', response.data.msg)
      })  
      .catch((error) => {
        if (error.response.data) {
          context.commit('setErrorsForm', error.response.data)
        }
      })
  },
  deleteUser(context, deletedUser) {
    console.log(deletedUser)
    axios
      .delete(`${BASE_URL}/users/delete-user/${deletedUser._id}`, deletedUser)
      .then((response) => {
        console.log('delete Users')
        console.log(response.data)
        context.commit('deleteUser', deletedUser)
        context.commit('setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('setErrorsForm', error.response.data)
        }
      })
  }
}
