<template>
  <div class="product">
    <div class="product-pic">
      <img :src="chooseProduct.picSrc">
    </div>

    <div class="product-text">
      <div class="title">{{chooseProduct.name}}</div>
      <div class="price">{{chooseProduct.price}}</div>
      <div class="other">
        <span>快递费：{{chooseProduct.expressPrice}}</span>
        <span>月销量：{{chooseProduct.monthlySales}}</span>
        <div>地址：{{chooseProduct.address}}</div>
      </div>
    </div>

    <div @click="showChooseType" class="btn--choose-type"><i class="iconfont">&#xe627;</i>请选择商品类型</div>
    <div class="product-detail">{{chooseProduct.detail}}</div>
    <chooseProductType :chooseProduct="chooseProduct" v-show="isEject"></chooseProductType>
    <ProductFooter></ProductFooter>
  </div>
</template>

<script>
  import ProductFooter from '@/components/product/product-footer'
  import chooseProductType from '@/components/product/choose-product-type'
  import Vue from 'vue'
  export default {
    name:"product",
    data(){
      return{
        chooseProduct: {}
      }
    },
    computed: {
      isEject(){
        return this.$store.state.isEjectChooseType;
      }
    },
    methods: {
      showChooseType(){
        this.$store.commit('SHOW_CHOOSE_TYPE',true);
      },
      loadProductDetail(){
        const shopIndex = this.$route.params.shopIndex,
              typeIndex = this.$route.params.typeIndex,
              productIndex = this.$route.params.productIndex;

        return this.axios.get(`/shop/${shopIndex}/${typeIndex}/${productIndex}`)
          .then(res => {
            this.chooseProduct = res.data;
            this.$store.commit('COPY_TO_CART', res.data);
          });
      }
    },
    created () {
      this.loadProductDetail();
    },
    components: { chooseProductType, ProductFooter }
  }
</script>

<style scoped>

  .product {
    margin: .4rem auto;
  }

  .product-pic {  
    height: 3.75rem;
    & img {
      height: 100%;
    }
  }

  .product-text {
    padding: .5em;
    background-color: white;
  }
    .price { 
      font-size: 20px;
      color: red;
    }

  .btn--choose-type {
    line-height: .4rem;
    font-size: 18px;
    text-align: center;
    background-color: white;
    margin-top: .05rem;
  }

  .product-detail {
    padding: .5em;
    margin-top: .05rem;
    background-color: white;
  }
</style>