export default {
  state: {
    hasLogin: false,
    username: ''
  },
  mutations: {
    ['CHANGE_LOGIN_TOKEN'](state) {
      state.hasLogin = true;
    },
    ['LOAD_USERNAME'](state, name) {
      state.username = name;
    },
    ['LOGOUT'](state){
      state.username = '';
      state.hasLogin = false;
    }
  }
}