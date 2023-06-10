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
          context.commit('setErrorsForm', error.response.data);
        }
      })
    },
    updateUser(context, user) {
      console.log(user)
    },
    deleteUser(context, user) {
      console.log(user)
    }
  }