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
    },
    addApiItem(state, data) {
      // Push new item in state
      const { items } = state.data
      items.push(data);
    },
    editApiItem(state, value) {
      // Push updated item in state
      const { items } = state.data
      const { data } = value

      const itemData = items.find(item => item._id === state.currentItemId)

      itemData.name = data.name
      itemData.age = data.age
      itemData.description = data.description
    },
    deleteApiItem(state) {
      // Filter out of array
      const { items } = state.data
      const currentItem = items.find(item => item._id === state.currentItemId)
      let index = items.indexOf(currentItem)
      if(index > -1 ) items.splice(index, 1), state.detailShow = false
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
    addApiDetail({ commit }, value) {
      axios
        .post('http://145.24.222.135:8000/api/artists/', {
          name: value[0],
          age: value[1],
          description: value[2]
        })
        .then( response => response.data )
        .then( data => {
          commit('addApiItem', data)
        })
    },
    editApiDetail({ commit }, value) {
      axios
        .put(`http://145.24.222.135:8000/api/artists/${this.state.currentItemId}`, {
          name: value[0],
          age: value[1],
          description: value[2]
        })
        .then( response => response.data )
        .then( data => {
          commit('editApiItem', data)
        })
    },
    deleteApiDetail({ commit }) {
      axios
        .delete(`http://145.24.222.135:8000/api/artists/${this.state.currentItemId}`)
        .then( response => response.data )
        .then( data => {
          commit('deleteApiItem', data)
        })
    }
  },
})
