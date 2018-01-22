import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import AddSite from '@/components/AddSite'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
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
      children: [
        {
          path: 'home',
          component: Home,
          name: 'home',
          alias: '/',
          children: [
            {
              path: ':folder/edit/:key',
              component: AddSite,
              name: 'editsite'
            },
            {
              path: 'site/add',
              component: AddSite,
              name: 'addsite'
            }
          ]
        }
      ]
    }
  ]
})
