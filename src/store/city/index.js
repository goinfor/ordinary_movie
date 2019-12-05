const state = {
  nm: window.localStorage.getItem('nowCityName') || '北京',
  id: window.localStorage.getItem('nowCityId') || 1,
}

const actions = {
  updateCityInfo({commit}, {name, id}) {
    commit('SET_CITYNAME', name)
    commit('SET_CITYID', id)
  }
}

const mutations = {
  SET_CITYNAME: (state, name) => {
      state.nm = name
  },
  SET_CITYID: (state, cityId) => {
    state.id = cityId
  }
}

export default {
  namespaces: true,
  state,
  actions,
  mutations
}
