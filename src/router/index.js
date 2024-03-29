import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Connect/LoginView.vue'
import RegisterView from '../views/Connect/RegisterView.vue'
import AttendeesView from '../views/Attendees/AttendeesView.vue'
import CategoriesView from '../views/Categories/CategoriesView.vue'
import TransactionsView from '../views/Transactions/TransactionsView.vue'
import BalanceView from '../views/Balance/BalanceView.vue'
import AdminView from '../views/Admin/AdminView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import SendingView from '../views/Sending/SendingView.vue'

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
      path: '/categories',
      name: 'Categories',
      component: CategoriesView
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: TransactionsView
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
    }, 
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/sending',
      name: 'Sending',
      component: SendingView
    }
  ]
})

export default router
