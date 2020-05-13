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
import db from './firebase'
import VueCarousel from 'vue-carousel';
import VuePreview from 'vue-preview'
import wysiwyg from "vue-wysiwyg";
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(wysiwyg, {hideModules: { "code": true, "orderedList": true, "unorderedList": true,  "image": true, "table": true, "separator": true}});

Vue.config.productionTip = false

Vue.use(VueFilterDateParse)
Vue.use(VueFilterDateFormat)
Vue.use(VueFilterMinutesToHours)

Vue.use(ElementUI, { locale })

Vue.prototype.$db = db

Vue.use(VueCarousel);
Vue.use(VuePreview)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
