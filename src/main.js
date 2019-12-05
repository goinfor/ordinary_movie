import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Field, IndexList, IndexSection, Cell, MessageBox, Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
import Scroller from '@/components/Scroller/Scroller'
import axios from 'axios'
Vue.prototype.$http = axios
import store from '@/store'

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
Vue.component('Scroller', Scroller)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.prototype.$alert = MessageBox

Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
