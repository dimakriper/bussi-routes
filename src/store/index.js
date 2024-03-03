import Vue from 'vue'
import Vuex from 'vuex'
import {requestRoutes} from "@/services/routesRequests";

Vue.use(Vuex)

const initialState = {
  mapCenter: {lat: 59.942286, lon: 30.305557},
  busRoutes: [],
  isReady: false
}

export default new Vuex.Store({
  state: initialState,
  getters: {
    mapCenter: state => {
      return [state.mapCenter.lat, state.mapCenter.lon];
    },
    busStops: state => {
      return state.busRoutes.flatMap((route) => (route.Stops))
    },
    routeById: (state) => (id) => {
      return state.busRoutes.find( (route) => route.ID === id);
    },
  },
  mutations: {
    setBusRoutes(state, payload){
      state.busRoutes = payload;
    },
    setReadyStatus(state, status){
      state.isReady = status;
    }
  },
  actions: {
    getRoutes({commit}){
      requestRoutes().then(data => {
        commit("setBusRoutes", data);
        commit("setReadyStatus", true);
      })
    }
  },
  modules: {
  }
})
