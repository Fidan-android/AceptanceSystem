import Vue from 'vue'
import VueRouter from 'vue-router'
import { checkPermission } from '../helpers/fetch.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    beforeEnter: ((to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    }),
    name: 'Panel',
    component: () => lazyLoadView(localStorage.getItem("token"))
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

async function lazyLoadView(token) {
  var permission = (await checkPermission(token))['permission'];
  //проверяю доступность и показываю определенные панельки
  if (permission === "user") {
    return import('../views/UserPanel.vue');
  } else if (permission == "admin") {
    return import('../views/AdminPanel.vue');
  } else {
    return import('../views/DispatcherPanel.vue');
  }
}

export default router
