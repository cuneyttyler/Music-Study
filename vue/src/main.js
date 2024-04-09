import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
// import '../../plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false 

window.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
