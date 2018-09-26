// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import api from '@/api/api'
import VueAxios from 'vue-axios'
import router from '@/router/router'
import store from '@/vuex/store'

Vue.config.productionTip = false
Vue.use(VueAxios,api);

/* eslint-disable no-new */
new Vue ({
  el: '#app',
  components: { App },
  router,store,
  template: `<App/>`,
  methods: {
    /*rem自适应*/
    setHTMLFontSize() {
      let HTMLClientWidth = document.documentElement.clientWidth ||
      document.body.clientWidth;
      document.documentElement.style.fontSize
      = `${HTMLClientWidth / 3.75}px`;
      return HTMLClientWidth;
    }
  },
  created() {
    const _self = this;
    _self.setHTMLFontSize();
    window.addEventListener("resize",function(){
      _self.setHTMLFontSize();
    });
  }
})
