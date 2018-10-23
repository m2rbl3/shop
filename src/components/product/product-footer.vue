<template>
    <div class="product-footer">
      <div class="all-price">总价格：<span class="color-red">{{allPrice}}</span></div>
      <!-- <router-link @click="checklogin" to="pay" class="buy">购买</router-link> -->
      <div @click="addCart" class="add-cart btn--a">添加进购物车</div>
    </div>
</template>

<script>
import vue from "vue";
export default {
  name: "product-footer",
  computed: {
    productCache() {
      return this.$store.state.productCache;
    },
    allPrice() {
      const _self = this;
      if (this.$store.state.productCache.allPrice === undefined)
        this.$store.commit("CART_PRODUCT_ALLPRICE", this.productCache.price);
      return this.productCache.allPrice;
    },
    showChooseType() {
      return this.$store.state.isEjectChooseType;
    },
    pay() {
      if (this.productCache.type !== undefined)
        return "/pay";
      else 
        return "";
    }
  },
  methods: {
    addCart() {
      /* 已勾选产品类型提交 */
      if (this.productCache.type !== undefined) {
        let params = this.$route.params,
          state = this.$store.state,
          shopIndex = params.shopIndex,
          typeIndex = params.typeIndex,
          shopID = state.shops[shopIndex]._id,
          name = state.shops[shopIndex].name,
          products = [{proIndex: params.productIndex, ...state.productCache}];

        let shopCache = JSON.parse(JSON.stringify({
          name,
          shopID,
          shopIndex,
          typeIndex,
          products,
          checked: false
        }));

        this.$store.commit("ADD_TO_CART", shopCache);
        this.$router.push("/cart?headName=购物车");
        this.$store.commit("CLEAR_PRODUCT_CACHE");  //把商品推进购物车后，清空缓存
      } else this.$store.commit("SHOW_CHOOSE_TYPE", true);
      /*否则打开选择页面*/
    },
    checkLogin () {
      if (!this.$store.hasLogin) this.$router.push("/login");
    }
  }
};
</script>

<style>
.product-footer {
  height: 0.4rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 16px;
  background-color: white;
  box-shadow: 1px 0 1px #404040;
}
.all-price {
  display: inline-block;
  margin: auto;
  padding: 0 0.5em;
  line-height: 0.4rem;
}

.color-red {
  color: red;
  font-size: 20px;
}

.buy {
  padding: 0 0.5em;
  line-height: 0.4rem;
  float: right;
  background-color: pink;
  color: white;
}

.add-cart {
  padding: 0 0.5em;
  line-height: 0.4rem;
  float: right;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
}
</style>