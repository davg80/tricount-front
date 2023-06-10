const BASE_URL = 'http://localhost:3333/api/v1'
import axios from 'axios'
import router from '../../../router';

export default {
    login(context, user) {
        console.log('loggin')
        axios
          .post(`${BASE_URL}/auth/login`, user)
          .then((response) => {
            console.log(response)
            context.commit('setLogger', response.data.user)
            context.commit('setIsAdmin', response.data.user.role)
            context.commit('setMessages', response.data.msg)
            router.push({name: 'Home'})
          })
          .catch((error) => {
            if (error.response.data) {
              context.commit('setErrorsForm', error.response.data)
            }
          })
      },
      register(context, user) {
        console.log('register')
        console.log(user);
        axios
        .post(`${BASE_URL}/auth/register`, user)
        .then((response) => {
          console.log(response);
          context.commit("setLogger", response.data.user);
          context.commit("setMessages", response.data.msg);
          router.push({name: 'Home'})
        })
        .catch((error) => {
          if (error.response.data) {
            context.commit("setErrorsForm", error.response.data);
          }
        });
      },
      logout(context) {
        console.log('logout')
        axios
        .get(`${BASE_URL}/auth/logout`)
        .then((response) => {
          console.log(response);
          context.commit("setLogger", null);
          context.commit("setMessages", response.data.msg);
          router.push({name: 'Login'})
        })
        .catch((error) => {
          console.log(error);
        });
      },
}