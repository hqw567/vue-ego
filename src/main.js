import '@/assets/css/reset.css'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import api from './api'
import App from './App.vue'
import i18n from './lang'
import router from './router'
import './router/permission'
import store from './store'
import './utils/localStorage'
Vue.prototype.$echarts = echarts
Vue.prototype.$api = api
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
