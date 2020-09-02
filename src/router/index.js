import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/activate',
    name: 'Activate',
    component: () => import(/* webpackChunkName: "about" */ '../views/pages/Activate.vue')
  },
  {
    path: '*',
    name: 'Notfound',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notfound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
