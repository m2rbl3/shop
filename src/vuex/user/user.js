export default {
  state: {
    hasLogin: false,
    name: ''
  },
  mutations: {
    ['CHANGE_LOGIN_TOKEN'](state) {
      state.hasLogin = true;
    },
    ['LOAD_USERNAME'](state, name) {
      state.name = name;
    },
    ['LOGOUT'] (state) {
      state.name = '';
      state.hasLogin = false;
    }
  }
}