import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Add from '@/components/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/modal/add/:key',
          component: Add,
          name: 'edit'
        },
        {
          path: '/modal/add',
          component: Add,
          name: 'add'
        }
      ]
    }
  ]
})
