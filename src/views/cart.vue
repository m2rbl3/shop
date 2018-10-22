<template>
<div>
  <div class="cart-list">
    <div :key="shop.shopID" v-for="(shop, shopIndex) in cartShops" class="list-shop">
      <!-- 不同的店列表 -->
      <div class="shop-module">
        <div class="checkbox">
          <input :id="shop.shopID" :checked="shop.checked" @click="shopAllSelect($event,shopIndex)" type="checkbox"
            class="input-choose">
          <label :for="shop.shopID" class="choose-label"></label>
        </div>
        <JumpShop :shop="shop"></JumpShop>
      </div>

      <!-- 同一家店的商品列表 -->
      <ul>
        <li v-for="(product, productIndex) in shop.products" :key="product.productID" class="list-product">
          <div class="checkbox">

            <input :checked="product.checked" :id="product.productID + product.type" :data-shop-id="shop.shopID"
              :data-price="product.price" :data-count="product.count" @click="checkedSync($event, shopIndex, productIndex)"
              type="checkbox" class="input-choose">

            <label :for="product.productID + product.type" class="choose-label"></label>
          </div>

          <div class="pic-wrap">
            <img :src="product.picSrc" class="preview-pic">
          </div>

          <div class="product-module">
            <JumpProduct :shop="shop" :product = "product"></JumpProduct>
            <!-- <p class="product-name btn--a">{{product.name}}</p> -->
            <div class="choose-type btn--a">
              <span>{{product.type}}</span><span class="icon--go">></span>
            </div>
            <div class="btn-wrap">
              <CartCount :shop-index="shopIndex" :product-index="productIndex"></CartCount>
              <button @click="delCartProduct(shopIndex,productIndex)" class="btn-del">删除</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- 结算底栏 -->
  <div v-if="hasProducts" class="payment-module">
    <div class="all-price">总计：{{allPrice}}</div>
    <a @click="canGoPay" class="payment btn--a">结算</a>
    <tip-dialog ref="tip">请选择需要结算的商品</tip-dialog>
  </div>
  <!-- 购物车无商品提示 -->
  <div v-else class="no-product-tip">
    <p class="tip-text">你的购物车空空如也</p>
  </div>
</div>
</template>

<script>
import vue from "vue"
import CartCount from "@/components/cart/cart-count"
import TipDialog from "@/components/tip-dialog"
import JumpProduct from "@/components/product/jump-product"
import JumpShop from "@/components/shop/jump-shop"

export default {
  name: "cart",
  computed: {
    cartShops() {
      return this.$store.state.cartShops;
    },
    allPrice() {
      if (this.cartShops.length > 0) {
        /* 全购物车 */
        let allPriceCache = this.cartShops.reduce((acc, shop) =>
          /* 各店的商品总价格 */
          acc + shop.products.reduce((acc, product) => {
            return product.checked ?
              acc + parseFloat(product.allPrice) :
              acc
          }, 0), 0);
        return Math.ceil(100 * allPriceCache) / 100;
      } else return 0;
    },
    /*购物车空则提示，否则显示付款底栏*/
    hasProducts() {
      if (this.cartShops.length == 0) return "";
      else return "/pay";
    },
  },
  methods: {
    /*全选反选并同步store选中状态*/
    shopAllSelect(e, shopIndex) {
      const _self = this;

      this.$store.commit("SHOP_ALL_CHECK", {
        shopIndex,
        val: e.target.checked
      });
      if (!!e.target.checked)
        this.cartShops[shopIndex].products.forEach((product, productIndex) => {
          _self.$store.commit("CHANGE_CART_PRODUCT_DATA", {
            shopIndex,
            productIndex,
            prop: "checked",
            val: true
          });
        });
      else
        this.cartShops[shopIndex].products.forEach((product, productIndex) => {
          _self.$store.commit("CHANGE_CART_PRODUCT_DATA", {
            shopIndex,
            productIndex,
            prop: "checked",
            val: false
          });
        });
    },

    /* 与store同步checked状态 */
    checkedSync(e, shopIndex, productIndex) {
      if (!!e.target.checked)
        this.$store.commit("CHANGE_CART_PRODUCT_DATA", {
          shopIndex,
          productIndex,
          prop: "checked",
          val: true
        });
      else
        this.$store.commit("CHANGE_CART_PRODUCT_DATA", {
          shopIndex,
          productIndex,
          prop: "checked",
          val: false
        });

      /* 如果所有商品都全选了，商店的全选按钮也变成选择状态 */
      (cartShops => {
        const _self = this;
        cartShops.forEach((shop, shopIndex) => {
          /* 如果全部商品都checked了, 则同步商品全选按钮checked */
          if (shop.products.every(product => product.checked))
            _self.$store.commit("SHOP_ALL_CHECK", {
              shopIndex,
              val: true
            });
          else _self.$store.commit("SHOP_ALL_CHECK", {
            shopIndex,
            val: false
          });
        });
      })(this.cartShops);
    },

    /*删除购物车某商品*/
    delCartProduct(shopIndex, productIndex) {
      this.$store.commit("DEL_CART_PRODUCT", {
        shopIndex,
        productIndex
      });
      
      /* 如果商店商品列表为空, 则删除该商店 */
      if (this.cartShops[shopIndex].products.length === 0)
        this.$store.commit("DEL_CART_SHOP", shopIndex);
    },
    canGoPay() {
      if (this.allPrice == 0) {
        this.$refs.tip.toShowDialog(true);
      } else this.$router.push('/pay');
    }
  },
  components: {
    CartCount,
    TipDialog,
    JumpShop,
    JumpProduct
  }
};
</script>

<style scoped>
.cart-list {
  margin-bottom: 0.4rem;
}

.list-shop {
  margin: 0.1rem auto;
  /*    padding: .1rem;*/
  font-size: 16px;
  background-color: white;
}

.shop-module {
  padding: 0.1rem;
  font-size: 20px;
  display: flex;
  border-bottom: 1px solid #ddd;
}

.checkbox {
  font-size: 20px;
  margin: auto 0;
}

.input-choose {
  display: none;
}

.choose-label {
  height: 0.15rem;
  width: 0.15rem;
  display: inline-block;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 50%;
}

.input-choose:checked + .choose-label {
  background-color: #274ab4;
}

.shop-name {
  margin-left: 0.5em;
  display: inline-block;
}

.icon--go {
  margin-left: 0.5em;
}

.list-product {
  padding: 0.1rem;
  display: flex;
  flex-direction: row;
}

.list-product + .list-product {
  border-top: 1px solid #ddd;
}

.pic-wrap {
  margin: auto;
  margin-left: 0.5em;
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

.choose-type {
  margin: 1em auto;
  background-color: #ddd;
}

.btn-wrap {
  white-space: nowrap;
}

.btn-del {
  margin-left: 1em;
  padding: 0.5em;
  font-size: 20px;
  line-height: 1;
  color: white;
  background-color: red;
}

.payment-module {
  height: 0.4rem;
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: white;
  text-align: center;
}

.all-price {
  width: 60%;
  margin: auto 0;
  font-size: 20px;
  line-height: 0.4rem;
  flex-grow: 1;
  display: inline-block;
  color: red;
}

.all-price::after {
  content: "元";
}

.payment {
  margin: auto;
  line-height: 0.4rem;
  color: white;
  background-color: red;
  flex-grow: 1;
}

.no-product-tip {
  height: 3rem;
  margin: auto;
  padding: ;
  & .tip-text {
    text-align: center;
    font-size: 30px;
    line-height: 3rem;
    vertical-align: middle;
    color: #aaa;
  }
}
</style>