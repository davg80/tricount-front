import { createStore } from 'vuex'

import authModule from "./modules/auth";
import usersModule from "./modules/users";

export default createStore({
  modules: {
    auth: authModule,
    users: usersModule,
  },
});