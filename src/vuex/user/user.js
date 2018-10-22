export default {
  state: {
    fromPath: '',
    hasLogin: false,
    name: '',
    un: ''
  },
  mutations: {
    ['CHANGE_LOGIN_TOKEN'](state, hasLogin) {
      state.hasLogin = hasLogin;
    },
    ['LOAD_USERNAME'](state, {name, un}) {
      name && (state.name = name);
      un && (state.un = un);
    },
    ['LOGOUT']() {
      this.commit('CHANGE_LOGIN_TOKEN', false);
      this.commit('LOAD_USERNAME', {name: '未登陆', un: undefined});
    },
    /* 返回登陆前的页面 */
    ['REMEMBER_FROM_PATH_TO_LOGIN'](state, val){
      state.fromPath = val;
    }
  }
}
