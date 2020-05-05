import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFilterDateParse from './filters/date-parse'
import VueFilterDateFormat from './filters/date-format'
import VueFilterMinutesToHours from './filters/minutes-to-hours'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/fr'
import './styles/my-style-element-ui.scss'
import firebaseConfig  from './firebaseConfig'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.config.productionTip = false

Vue.use(VueFilterDateParse)
Vue.use(VueFilterDateFormat)
Vue.use(VueFilterMinutesToHours)

Vue.use(ElementUI, { locale })

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
Vue.prototype.$db = db

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
