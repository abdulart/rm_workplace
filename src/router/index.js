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
    path: '/reorderactivators',
    name: 'ReorderActivators',
    component: () => import('@/views/pages/ReorderActivators.vue')
  },
  {
    path: '/addprospect',
    name: 'AddProspect',
    component: () => import('@/views/pages/AddProspect.vue')
  },
  {
    path: '/prospectsdashboard',
    name: 'ProspectsDashboard',
    component: () => import('@/views/pages/ProspectsDashboard.vue')
  },
  {
    path: '/prospect/:id',
    name: 'Prospect',
    component: () => import('@/views/pages/Prospect.vue')
  },
  {
    path: '/prospects/main',
    name: 'ProspectsMain',
    component: () => import('@/views/prospects/Main.vue')
  },
  {
    path: '/manager/region',
    name: 'RegManager',
    component: () => import('@/views/manager/RegManager.vue')
  },
  {
    path: '/manager/subregion',
    name: 'SubregManager',
    component: () => import('@/views/manager/SubregManager.vue')
  },
  {
    path: '/manager/tasks',
    name: 'Tasks',
    component: () => import('@/views/manager/Tasks.vue')
  },
  {
    path: '/manager/hunters',
    name: 'Hunters',
    component: () => import('@/views/manager/Hunters.vue')
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
