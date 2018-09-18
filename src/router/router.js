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
    path: '/shop',
    name: '商店',
    components: {
      default: shop,
      header: header,
      footer: footer
    }
  }, {
    path: '/user',
    name: '用户管理',
    components:{
      default: user,
      header: header,
      footer: footer
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
    path: '/product',
    name: '产品详情',
    components: {
      default: product,
      header: header
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
//     next({path:`/login?frompath=${to.path}`});
//   else next();
//  });
export default router
