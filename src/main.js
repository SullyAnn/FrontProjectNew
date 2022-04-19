import Vue from 'vue'
import App from './App.vue'
import responsive from 'vue-responsive'

Vue.use(responsive)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
