import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LuaConsole from "../views/LuaConsole";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About')
  },
  {
    path: '/lua',
    name: 'LuaConsole',
    component: LuaConsole
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import("../views/Settings")
  },
  {
    path: "/i18n",
    name: 'Localization',
    component: () => import("../components/HelloI18n")
  }
];

const router = new VueRouter({
  routes
});

export default router
