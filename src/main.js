import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import lazyLoad from 'vue-lazyLoad'
import store from './store'

import 'common/stylus/index.styl'

Vue.use(lazyLoad, {
  loading: require('common/image/default.png')
})
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})