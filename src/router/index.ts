import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuth } from '@/modules/useAuth'
import RegisterView from '@/views/RegisterView.vue'
import DashboardWrapper from '@/layout/wrapper/DashboardWrapper.vue'
import CreateArticleView from '@/views/articles/CreateArticleView.vue'
import EditArticleView from '@/views/articles/EditArticleView.vue'
import ArticlesView from '@/views/articles/ArticlesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardWrapper,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'articles/create',
          component: CreateArticleView
        },
        {
          path: 'articles/edit/:slug',
          name: 'article-edited',
          component: EditArticleView
        },
        {
          path: 'articles',
          name: 'articles',
          component: ArticlesView
        },
        {
          path: 'articles/page/:page',
          name: 'articles-page',
          component: ArticlesView,
          props: true
        }
      ]
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
