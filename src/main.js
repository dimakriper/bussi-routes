import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import loader from "vue-ui-preloader";

Vue.config.productionTip = false


Vue.use(loader);

new Vue({
  router, //not necessary here but i use router by default
  store,
  render: h => h(App)
}).$mount('#app')
