// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// UI
import router from '@/router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { Form, FormItem, Input, Option, Select } from 'element-ui'
import Vue from 'vue'
import Tooltip from 'vue-directive-tooltip'
// Tooltip
import 'vue-directive-tooltip/css/index.css'
import VueProgressiveImage from 'vue-progressive-image'
import VueFire from 'vuefire'
import App from './App'

import '@/styles/styles.css'

Vue.use(Tooltip)
// buefy
Vue.use(Buefy)
Vue.use(VueFire)
// element
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)

// image process
Vue.use(VueProgressiveImage)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
