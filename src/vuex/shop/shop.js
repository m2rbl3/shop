
import Vue from 'vue'
export default {
  state: {
    shops: [],                  //商铺列表
    chooseType: {},             //选择类型
    chooseTypeIndex: 0,         
    chooseShop: {},             //选择店铺
    chooseProduct: {},          //选择产品
    productCache: {},            //将要加入购物车的产品
    isEjectChooseType: false    //产品页面弹出类型选择菜单
  },
  getters: {
    /*选择产品类型的产品列表*/
    products(state){ 
      return state.chooseType.products;
    },
  },
  mutations: {
    /*读取商店列表*/
    ['LOAD_SHOP_LIST'](state,list) {
      state.shops = list;
    },
    /*读取商店列表的产品类型列表*/
    ['LOAD_SHOP_TYPE'](state,ShopIndex) {
      state.chooseShop = state.shops[ShopIndex];
    },
    /*读取选择产品类型的产品列表*/
    ['LOAD_PRODUCT_TYPE'](state,typeIndex){
      state.chooseType = state.chooseShop.types[typeIndex];
      state.chooseTypeIndex = typeIndex;
    },
    /*读取选择的产品*/
    ['LOAD_PRODUCT_DETAIL'](state,productIndex){
      state.chooseProduct = this.getters.products[productIndex];
      this.commit('PRODUCT_CACHE');
    },
    /*弹出产品选择类型的菜单*/
    ['SHOW_CHOOSE_TYPE'](state,val) {
      state.isEjectChooseType = val;
    },
    /*将选择产品缓存，准备推入购物车*/
    ['PRODUCT_CACHE'](state){
       state.productCache = JSON.parse(JSON.stringify(state.chooseProduct));
    },
    /*改变产品数量*/
    ['CHANGE_PRODUCT_COUNT'](state,val) {
      Vue.set(state.productCache,'count',val);
    },
    /*改变产品总价格*/
    ['CART_PRODUCT_ALLPRICE'](state,val){
      Vue.set(state.productCache,'allPrice',val);
    },
    ['CHANGE_PRODUCT_CACHE'](state,val){
      Vue.set(state.productCache,val.key,val.value);
    },
  },
  actions: {
    /*请求商店数据*/
    ['LOAD_SHOP_LIST']({commit}) {
      return Vue.axios({
        url:'http://localhost:8050/static/shop.json',
        method: 'get'
       }).then( res => commit('LOAD_SHOP_LIST',res.data))
       .catch( err => console.log(err));
    }
  }
}