import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/micro/example',
    name: 'example',
    component: () => import('../views/example.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
