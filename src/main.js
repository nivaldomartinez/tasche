// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import {Input, Form, FormItem, Select, Option} from 'element-ui'
import Tooltip from 'vue-directive-tooltip'
import VueProgressiveImage from 'vue-progressive-image'

// UI
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// Tooltip
import 'vue-directive-tooltip/css/index.css'
Vue.use(Tooltip)

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
