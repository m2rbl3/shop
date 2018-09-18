<template>
  <div>
    <div class="cart-list">
      <div v-for="(shop, shopIndex) in cartShops" class="list-shop">
        <!-- 不同的店列表 -->
        <div class="shop-module">
          <div class="checkbox">
            <input :checked="shop.checked" @click="shopAllSelect($event,shopIndex,shop.shopID)" 
              type="checkbox" :id="shop.shopID" class="input-choose js-calcprice">
            <label :for="shop.shopID" class="choose-label"></label>
          </div>
          <router-link :to="'/shop?headName=' + shop.name" class="shop-name">{{shop.name}}</router-link>
          <span class="icon--go">></span>
        </div>

        <!-- 同一家店的商品列表 -->
        <ul>
          <li v-for="(product, productIndex) in shop.products" class="list-product">
            <div class="checkbox">

              <input :checked="product.checked" 
                @click="checkedSync($event, shopIndex, productIndex)" 
                :id="product.productID + product.type" 
                :data-shop-id="shop.shopID" 
                :data-price="product.price" 
                :data-count="product.count" 
                type="checkbox"
                class="input-choose js-checked js-calcprice">

              <label :for="product.productID + product.type" class="choose-label"></label>
            </div>

              <div class="pic-wrap">
                <img :src="product.picSrc" class="preview-pic">
              </div>

              <div class="product-module">
                <p class="product-name btn--a">{{product.name}}</p>
                <div class="choose-type btn--a">
                  <span>{{product.type}}</span><span class="icon--go">></span>
                </div>
                <CartCount :shop-index="shopIndex" :product-index="productIndex"></CartCount>
              </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 结算底栏 -->
    <div v-if="canGoPay" class="payment-module">
      <div class="price all-price">总计：{{allPrice}}</div>
      <router-link :to="canGoPay" class="payment btn--a">结算</router-link>
    </div>

    <!-- 购物车无商品提示 -->
    <div v-else class="no-product-tip">
      <p class="tip-text">你的购物车空空如也</p>
    </div>
      
    </div>
  </div>
</template>

<script>
  import vue from 'vue'
  import CartCount from '@/components/cart/cart-count'
  export default {
    name:'cart',
    data(){
      return{
        isShopAllCheck:false
      }
    },
    computed:{
      cartShops() {
        return this.$store.state.cartShops;
      },
      /*计算总价格*/
      allPrice() {
        if( this.cartShops.length > 0){
          let allPriceCache = this.cartShops.map(
            ( shop, si ) => 
              shop.products.map(
                ( product, pi) =>{
                  if(product.checked)
                    return parseFloat(product.allPrice);
                  else return 0;
                }).reduce(( acc, cval) => acc + cval, 0) //各店的商品总价格
            ).reduce(( acc, cval) => acc + cval, 0)  //所有店的商品总价格
          return Math.ceil( 100 * allPriceCache ) / 100;
        }
        else return 0;
      },
      /*购物车空则提示，否则可以跳转付款*/
      canGoPay(){
        if( this.$store.state.cartShops.length == 0 ) return '';
        else return '/pay'
      }
    },
    watch:{
      /*如果所有商品都全选了，商店的全选按钮也变成选择状态*/
      cartShops:{
        handler(cartShops){
          const _self = this;
          cartShops.forEach(
            (shop,shopIndex) => {
              if(shop.products.every(product =>  product.checked))
                _self.$store.commit('SHOP_ALL_CHECK',{shopIndex,val: true});
              else
                _self.$store.commit('SHOP_ALL_CHECK',{shopIndex,val: false});
            }
          )
        },
        deep:true
      }
    },
    methods:{
      /*全选反选并同步store选中状态*/
      shopAllSelect( e,shopIndex,shopID){
        const _self = this;
        let checkboxs = document.querySelectorAll('.js-checked');
        checkboxs.forEach(
          ( checkbox, productIndex ) => {
            if( checkbox.dataset.shopId == shopID ){
              if(e.target.checked){
                _self.$store.commit('CHANGE_CART_PRODUCT_DATA',
                   { shopIndex, productIndex, prop:'checked', val:true }
                )
              }
              else {
                 _self.$store.commit('CHANGE_CART_PRODUCT_DATA',
                   { shopIndex, productIndex, prop:'checked', val:false }
                )
              }
            }
          }
        );
      },
      /*与store同步checked状态*/
      checkedSync(e,shopIndex,productIndex){
        if(e.target.checked)
          this.$store.commit('CHANGE_CART_PRODUCT_DATA',
            { shopIndex, productIndex, prop:'checked', val:true }
          );
        else this.$store.commit('CHANGE_CART_PRODUCT_DATA',
            { shopIndex, productIndex, prop:'checked', val:false }
        )
      }
    },
    components:{CartCount}
  }
</script>

<style scoped>

  .list-shop {
    margin:.1rem auto;
/*    padding: .1rem;*/
    font-size: 16px;
    background-color: white;
  }
  
  .shop-module {
    padding: .1rem;
    font-size: 20px;
    display: flex;
    border-bottom: 1px solid #DDD;
  }

    .checkbox {
      font-size: 20px;
      margin: auto 0;
    }

      .input-choose {
        display: none;
      }

      .choose-label {
        height: .15rem;
        width: .15rem;
        display: inline-block;
        background-color: #fff;
        border: 1px solid gray;
        border-radius: 50%;
      }
      
      .input-choose:checked + .choose-label{
        background-color:#6288f7;
      }

    .shop-name {
      margin-left: .5em;
      display: inline-block;
    }

    .icon--go {
      margin-left: .5em;
    }


  .list-product {
    padding: .1rem;
    display:flex;
    flex-direction: row;
  }

  .list-product + .list-product {
    border-top: 1px solid #DDD;
  }


  .pic-wrap {
    margin: auto;
    margin-left: .5em;
  }

    .preview-pic {
      height: 1rem;
      width: 1rem;
    }
  

  .product-module {
    margin: auto;
    padding: 0 1em;
    display: inline-block;
    flex-grow: 1;
  }
    .product-name {
      
    }

    .choose-type {
      margin: 1em auto;
      background-color: #DDD;
    }

    .change-price {
      display: flex;
      justify-content: space-between;
    }

      .price {
        width: 60%;
        margin: auto 0;
        font-size: 20px;
        display: inline-block;
        color: red;
      }
      .price::after {
        content:'元';
      }

    .count {
      display: flex;
    }

      .icon-subtract,.icon-add {
        padding: .5em;
        font-size: 20px;
        line-height: 1;
      }

      .input-count {
        width: 2.5em;
        margin: auto 0;
        font-size: 25px;
        text-align: center;
      }

      .input-count:focus {
        outline-color: red;
      }

  .payment-module {
    position:fixed;
    /*position: sticky;*/
    display: flex;
    left: 0;right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: white; 
    text-align: center;
  }
  
  .all-price {
    margin: auto 0;
    /*padding: 1em;*/
    flex-grow: 1;
  }

  .payment {
    margin: auto;
    padding: 1em;
    color: white;
    background-color: red;
    flex-grow: 1;
  }

  .no-product-tip {
    height: 3rem;
    margin: auto;
    padding: ;
    & .tip-text{
      text-align: center;
      font-size: 30px;
      line-height: 3rem;
      vertical-align: middle;
      color: #AAA;
    }
  }



</style>