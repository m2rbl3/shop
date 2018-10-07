<template>
    <div class="product-footer">
      <div class="all-price">总价格：<span class="color-red">{{allPrice}}</span></div>
      <!-- <router-link @click="checklogin" to="pay" class="buy">购买</router-link> -->
      <div @click="addCart" class="add-cart btn--a">添加进购物车</div>
    </div>
</template>

<script> 
  import vue from 'vue'
  export default {
    name:'product-footer',
    computed:{
      productCache(){
        return this.$store.state.productCache;
      },
      allPrice(){
        const _self = this;
        if(this.$store.state.productCache.allPrice === undefined)
          this.$store.commit('CART_PRODUCT_ALLPRICE', this.productCache.price);
        return this.productCache.allPrice;
      },
      showChooseType(){
        return this.$store.state.isEjectChooseType;
      },
      pay(){
        if( this.productCache.type !== undefined)
          return '/pay'
        else return '' 
      }
    },
    methods:{
      addCart(){
        const _self = this;
        /* 已勾选产品类型提交 */
        if(this.productCache.type !== undefined) {
          let {name, shopID} = this.$store.state.chooseShop;
          let shopCache = JSON.parse(JSON.stringify({name, shopID, checked: false, products: []}));
          shopCache.products.push(_self.$store.state.productCache);
          console.log(shopCache);
          this.$store.commit('ADD_TO_CART',shopCache);
          this.jumpToCart();
          this.$store.commit('PRODUCT_CACHE');  //把商品推进购物车后，清空缓存
        }
        /*否则打开选择页面*/
        else
         this.$store.commit('SHOW_CHOOSE_TYPE',true);
      },
      jumpToCart(){
        this.$router.push('/cart?headName=购物车');
      },
      checkLogin(){
        if(!this.$store.hasLogin)
          this.$router.push('/login');
      }
    },
    // updated(){
    //   this.$store.commit('PRODUCT_CACHE');
    // }
  }
</script>

<style>
  .product-footer {
    height: .4rem;
    position: fixed;
    left: 0;right: 0;
    bottom: 0;
    font-size: 16px;
    background-color: white;
    box-shadow: 1px 0 1px #404040;
  }
    .all-price {
      display: inline-block;
      margin: auto;
      padding: 0 .5em; 
      line-height: .4rem;
    }

    .color-red {
      color: red;
      font-size: 20px;
    }

    .buy {
      padding: 0 .5em; 
      line-height: .4rem;
      float: right;
      background-color: pink;
      color: white;
    }

    .add-cart {
      padding: 0 .5em; 
      line-height: .4rem;
      float: right;
      top: 0; right: 0;
      background-color: red;
      color: white;
    }
</style>