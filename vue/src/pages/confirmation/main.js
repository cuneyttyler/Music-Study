import Vue from 'vue'
import '../../plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vodal from 'vodal';
import "vodal/common.css";
import "vodal/rotate.css";
ind
Vue.component(Vodal.name, Vodal)

Vue.config.productionTip = false

window.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
