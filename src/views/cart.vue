<template>
  <div>
    <div class="cart-list">
      <div v-for="(shop, shopIndex) in cartShops" class="list-shop">
        <div class="shop-module">
          <div class="checkbox">
            <input @click="shopAllSelect($event,shopIndex,shop.shopID)" type="checkbox" :id="shop.shopID" class="input-choose js-calcprice">
            <label :for="shop.shopID" class="choose-label"></label>
          </div>
          <router-link to="/shop" class="shop-name">{{shop.name}}</router-link>
          <span class="icon--go">></span>
        </div>
        
        <ul>
          <li v-for="(product, productIndex) in shop.products" class="list-product">
            <div class="checkbox">

              <input @click="checkedSync($event, shopIndex, productIndex)" 
                :id="product.productID" 
                :data-shop-id="shop.shopID" 
                :data-price="product.price" 
                :data-count="product.count" 
                type="checkbox"
                class="input-choose js-checked js-calcprice">

              <label :for="product.productID" class="choose-label"></label>
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

    <div class="payment-module">
      <div class="price all-price">总计：{{allPrice}}</div>
      <router-link to="" class="payment btn--a">结算</router-link>
    </div>
  </div>
</template>

<script>
  import vue from 'vue'
  import CartCount from '@/components/cart/cart-count'
  export default {
    name:'cart',
    computed:{
      cartShops() {
        return this.$store.state.cartShops;
      },
      allPrice() {
        if( this.cartShops.length > 0)
          return this.cartShops.map(
            ( shop, si ) => 
              shop.products.map(
                ( product, pi) =>{
                  if(product.checked)
                    return parseFloat(product.allPrice);
                  else return 0;
                }).reduce(( acc, cval) => acc + cval, 0) //各店的商品总价格
            ).reduce(( acc, cval) => acc + cval, 0);  //所有店的商品总价格
        else return 0;
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
                checkboxs[productIndex].checked = true;
                _self.$store.commit('CHANGE_CART_PRODUCT_DATA',
                   { shopIndex, productIndex, prop:'checked', val:true }
                )
              }
              else {
                checkboxs[productIndex].checked = false;
                 _self.$store.commit('CHANGE_CART_PRODUCT_DATA',
                   { shopIndex, productIndex, prop:'checked', val:false }
                )
              }
            }
          }
        );
      },
      /*同步选中状态*/
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
      
      .input-choose:checked +.choose-label{
        background-color: blue;
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

</style>