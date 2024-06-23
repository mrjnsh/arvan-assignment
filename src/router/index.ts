import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuth } from '@/modules/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { authenticating, user } = useAuth()

  if (authenticating.value === false && to.meta.requiresAuth === true && !user?.value) {
    console.log('requires auth, redirect to login')
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
