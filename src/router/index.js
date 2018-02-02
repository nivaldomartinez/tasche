import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/views/Dashboard'
import Home from '@/views/Home'
import AddSite from '@/views/AddSite'
import Login from '@/views/Login'
import Profile from '@/views/Profile'

const NotFound = () => import('@/views/NotFound')

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
            },
            {
              path: 'profile',
              component: Profile,
              name: 'profile',
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
