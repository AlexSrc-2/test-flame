import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/peoples',
    component: () => import('../views/PeoplesView.vue')
  },
  {
    path: '/peoples/:id',
    component: () => import('../views/PeopleView.vue')
  },
  {
    path: '/favorites',
    component: () => import('../views/FavoritesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
