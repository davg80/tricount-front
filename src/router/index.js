import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Connect/LoginView.vue'
import RegisterView from '../views/Connect/RegisterView.vue'
import AttendeesView from '../views/Attendees/AttendeesView.vue'
import SendingsView from '../views/Sendings/SendingsView.vue'
import BalanceView from '../views/Balance/BalanceView.vue'
import AdminView from '../views/Admin/AdminView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/attendees',
      name: 'Attendees',
      component: AttendeesView
    }
    ,
    {
      path: '/sendings',
      name: 'Sendings',
      component: SendingsView
    },
    {
      path: '/balance',
      name: 'Balance',
      component: BalanceView
    },
    {
      path: '/admin/users',
      name: 'Admin',
      component: AdminView
    }
  ]
})

export default router
