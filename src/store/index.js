import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = {
  mapCenter: {lat: 59.942286, lon: 30.305557},
}

export default new Vuex.Store({
  state: initialState,
  getters: {
    getMapCenter: state => {
      return [state.mapCenter.lat, state.mapCenter.lon];
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
