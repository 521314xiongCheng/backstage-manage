import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ajax from '@/api/api'
import VueLazyload from 'vue-lazyload'

Vue.prototype.$ajax = ajax
Vue.use(ElementUI)
Vue.use(VueLazyload)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
