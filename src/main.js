import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
