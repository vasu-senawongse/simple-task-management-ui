import Vue from "vue";
import Router from "vue-router";
import Home from "../views/pages/index.vue";
import Login from "../views/pages/login.vue";
import Register from "../views/pages/register.vue";
import Logout from "../views/pages/logout.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  hash: false,
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "index",
      components: {
        default: Home,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: Login,
      },
    },
    {
      path: "/register",
      name: "register",
      components: {
        default: Register,
      },
    },
    {
      path: "/logout",
      name: "logout",
      components: {
        default: Logout,
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
