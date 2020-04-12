import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFilterDateParse from 'vue-filter-date-parse'
import VueFilterDateFormat from 'vue-filter-date-format';

Vue.config.productionTip = false

Vue.use(VueFilterDateParse)

Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
  ],
  dayOfWeekNamesShort: [
    'dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'
  ],
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
