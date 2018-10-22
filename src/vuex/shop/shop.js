
import Vue from 'vue'
import api from '@/api/api'
export default {
  state: {
    shops: [],                  //商铺列表
    chooseType: {},             //选择类型
    chooseShop: {},             //选择店铺
    productCache: {},            //将要加入购物车的产品
    isEjectChooseType: false    //产品页面弹出类型选择菜单
  },
  mutations: {
    /*读取商店列表*/
    ['LOAD_SHOP_LIST'] (state, data) {
      state.shops = data;
    },

    /*读取商店列表的产品类型列表*/
    ['LOAD_SHOP_TYPES'] (state, data) {
      state.chooseShop = data;
    },

    /*读取选择产品类型的产品列表*/
    ['LOAD_PRODUCT_TYPES'] (state, data) {
      state.chooseType = data;
    },

    /*读取选择的产品并缓存购物车*/
    ['COPY_TO_CART'] (state, chooseProduct) {
      state.productCache = JSON.parse(JSON.stringify(chooseProduct));
      Vue.set(state.productCache, 'count', 1);
    },

    ['CLEAR_PRODUCT_CACHE'] (state) {
      state.productCache = {};
    },

    /*弹出产品选择类型的菜单*/
    ['SHOW_CHOOSE_TYPE'] (state, val) {
      state.isEjectChooseType = val;
    },

    /*改变产品数量*/
    ['CHANGE_PRODUCT_COUNT'] (state, val) {
      Vue.set(state.productCache,'count',val);
    },

    /*改变产品总价格*/
    ['CART_PRODUCT_ALLPRICE'] (state, val) {
      Vue.set(state.productCache,'allPrice', Math.ceil(100 * val) / 100);
    },

    ['CHANGE_PRODUCT_CACHE'] (state, {key, value}) {
      Vue.set(state.productCache,key,value);
    },
  },
  actions: {

    /*请求商店数据*/
    ['LOAD_SHOP_LIST']({commit, state}){
      if(state.shops.length === 0)
        return Vue.axios({
          url: '/shopList',
          method: 'get'
        })
          .then(res => commit('LOAD_SHOP_LIST', res.data))
          .catch(err => console.error(err));
    },

    /* 请求产品类型 */
    ['LOAD_SHOP_TYPES']({commit}, shopIndex){
      return api.get(`/shop/${shopIndex}`)
        .then(res => commit('LOAD_SHOP_TYPES', res.data))
        .catch(err => console.log(err));
    },

    /* 读取选择产品类型的产品列表 */
    ['LOAD_PRODUCT_TYPES']({commit},{shopIndex, typeIndex}){
      return Vue.axios.get(`/shop/${shopIndex}/${typeIndex}`)
        .then(res => commit('LOAD_PRODUCT_TYPES', res.data, typeIndex))
        .catch(err => console.log(err));
    },
    
    /* 请求商品详情 */
    ['LOAD_PRODUCT_DETAIL']({commit}, {shopIndex, typeIndex, productIndex}){
      return Vue.axios.get(`/shop/${shopIndex}/${typeIndex}/${productIndex}`)
        .then(res => commit('LOAD_PRODUCT_DETAIL', res.data))
    }
  }
}