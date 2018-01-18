import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import AddSite from '@/components/AddSite'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: ':folder/edit/:key',
          component: AddSite,
          name: 'editsite'
        },
        {
          path: '/site/add',
          component: AddSite,
          name: 'addsite'
        }
      ]
    }
  ]
})
