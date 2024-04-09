import Vue from 'vue'
import '../../plugins/axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
window.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
