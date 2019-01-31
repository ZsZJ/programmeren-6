import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: Array,
    detailShow: false,
    currentItemId : 0
  },
  mutations: {
    setApiData (state, data) {
      state.data = data
    },
    setDetailToggle (state) {
      state.detailShow = !state.detailShow
    },
    setCurrentId (state, id) {
      state.currentItemId = id
    }
  },
  getters: {
    getItemById: state => (id) => {
      const { items } = state.data
      return items.find(item => item._id === id)
    }
  },
  actions: {
    loadApiData ({ commit }) {
      axios
        .get('http://145.24.222.135:8000/api/artists')
        .then( response => response.data )
        .then( data => {
          commit('setApiData', data)
        })
    },
  },
})
