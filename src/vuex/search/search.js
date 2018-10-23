//import Vue from 'vue'
import api from '@/api/api'
export default {
  state: {
    searchResult: []
  },
  mutations: {
    ['LOAD_SEARCH_RESULT'] (state, val) {
      state.searchResult = val;
    }
  },
  actions: {
    ['LOAD_SEARCH_RESULT'] ({commit}, value) {
      return api.get(`/search?value=${value}`)
        .then(res => {
          commit('LOAD_SEARCH_RESULT', res.data);
        });
    }
  }
}