import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    city
  }
})
