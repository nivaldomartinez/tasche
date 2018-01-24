import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import AddSite from '@/components/AddSite'
import Login from '@/components/Login'

const NotFound = () => import('@/components/NotFound')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          component: Home,
          name: 'home',
          alias: '/',
          meta: { requiresAuth: true },
          children: [
            {
              path: ':folder/edit/:key',
              component: AddSite,
              name: 'editsite',
              meta: { requiresAuth: true }
            },
            {
              path: 'site/add',
              component: AddSite,
              name: 'addsite',
              meta: { requiresAuth: true }
            }
          ]
        }
      ]
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user')) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
