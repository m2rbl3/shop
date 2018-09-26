/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-09-07 14:20:43
 * @version $Id$
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/vuex/store'

const index = () => import('@/views/index');
const user = () => import('@/views/user');
const shop = () => import('@/views/shop');
const order = () => import('@/views/order');
const product = () => import('@/views/product');
const cart = () => import('@/views/cart');
const login = () => import('@/views/login');
const register = () => import('@/views/register')
const pay = () => import('@/views/pay');
const header = () => import('@/components/v-header');
const footer = () => import('@/components/v-footer');

Vue.use(VueRouter);
const router = new VueRouter({
  base:'/',
  routes:[{
    path:'/',
    name:'电商',
    alias:'/index',
    components: {
      default: index,
      header: header,
      footer: footer
    }
  }, {
    path: '/shop/:shopIndex',
    name: '商店',
    props: {
      default: true,
      header: false,
      footer: false
    },
    components: {
      default: shop,
      header: header,
      footer: footer
    }, 
    beforeEnter(to, from, next){
      store.commit('LOAD_SHOP_TYPE',to.params.shopIndex);
      next();
    }  
  }, {
    path: '/user',
    name: '用户管理',
    components:{
      default: user,
      header: header,
      footer: footer
    },
    beforeEnter: (to, from, next) => {
      console.log(store.state.hasLogin);
      store.state.hasLogin ? next() : next('/login');
    }
  }, {
    path: '/order',
    name: '订单管理',
    components: {
      default: order,
      header: header,
      footer: footer
    }
  }, {
      name: '商品',
      path:'/shop/:shopIndex/product/:productIndex',
      components: {
        default: product,
        header: header
      },
      beforeEnter (to, from, next) {
        store.commit('LOAD_SHOP_TYPE',to.params.shopIndex);
        store.commit('LOAD_PRODUCT_DETAIL',to.params.productIndex);
        next();
      }
  }, {
    path: '/cart',
    name: '购物车',
    components: {
      default: cart,
      header: header
    }
  }, {
    path: '/login',
    name: '登陆',
    components:{
      default: login,
      header: header
    }
  }, {
    path: '/register',
    name: '注册',
    components:{
      default: register,
      header: header
    }
  },{
    path:'/pay',
    name: '付款',
    components:{
      default:pay,
      header:header
    }
  }]
});

// router.beforeEach((to,from,next) => {
//   if(to.path === '/login') {
//     next();
//   }
//   else if(!store.state.hasLogin)
//     next({path: `/login?frompath=${to.path}`});
//   else next();
//  });
export default router
