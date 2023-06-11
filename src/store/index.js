import { createStore } from 'vuex'

import authModule from "./modules/auth";
import usersModule from "./modules/users";
import attendeesModule from './modules/attendees';
import categoriesModule from './modules/categories';

export default createStore({
  modules: {
    auth: authModule,
    users: usersModule,
    attendees: attendeesModule,
    categories: categoriesModule
  },
});