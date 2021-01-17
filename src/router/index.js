import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import LuaConsole from "../views/LuaConsole";

class VueRouterEx extends VueRouter {
  constructor(options) {
    super(options);
    this.routes = [];
    this.moduleRoutes = new Map();  // module name - module paths pairs, used to map nav menus
    const { addRoutes } = this.matcher;
    const { routes } = options;
    this.routes = routes;
    this.matcher.addRoutes = (newRoutes) => {
      this.routes.push(...newRoutes);
      addRoutes(newRoutes);
    };
  }

  beforeEach(guard) {
    // TODO: check if user has access to page
    return super.beforeEach(guard);
  }
}

Vue.use(VueRouterEx);

const routes = [
  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: Home
  // },
  // {
  //   path: '/lua',
  //   name: 'LuaConsole',
  //   component: LuaConsole
  // },
  // {
  //   path: '/settings',
  //   name: 'Settings',
  //   component: () => import("../views/Settings")
  // },
  {
    path: "/i18n",
    name: 'Localization',
    component: () => import("../components/HelloI18n")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About')
  }
];

const router = new VueRouterEx({
  routes
});

export default router
