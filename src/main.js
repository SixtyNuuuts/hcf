import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFilterDateParse from './filters/date-parse'
import VueFilterDateFormat from './filters/date-format';
import VueFilterMinutesToHours from './filters/minutes-to-hours';

Vue.config.productionTip = false

Vue.use(VueFilterDateParse)
Vue.use(VueFilterDateFormat);
Vue.use(VueFilterMinutesToHours);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
