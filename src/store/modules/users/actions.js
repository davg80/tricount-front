const BASE_URL = 'http://localhost:3333/api/v1'
import axios from 'axios'
export default {
    fetchUsers(context, user) {
      console.log('User')
      axios
      .get(`${BASE_URL}/users`, user)
      .then((response) => {
        console.log(response)
        context.commit('setUsers', response.data.user)
        context.commit('setMessages', response.data.msg)
      })
      .catch((error) => {
        if (error.response.data) {
          context.commit('setErrorsForm', error.response.data);
        }
      })
    }
  }