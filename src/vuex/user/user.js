export default {
  state: {
    hasLogin: false,
    name: '',
    un:''
  },
  mutations: {
    ['CHANGE_LOGIN_TOKEN'](state) {
      state.hasLogin = true;
    },
    ['LOAD_USERNAME'](state, {name,un}) {
      state.name = name;
      state.un = un;
    },
    ['LOGOUT'](state) {
      state.name = '未登陆';
      state.hasLogin = false;
    }
  }
}
