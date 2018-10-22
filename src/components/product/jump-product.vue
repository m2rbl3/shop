<template>
  <router-link :to="productURL" class="product-name">{{product.name}}</router-link>
</template>

<script>
  export default {
    name: '商品页面跳转',
    props: ['shop', 'product'],
    computed:{
      productURL(){
        return `/shop/` +
        `${this.shop.shopIndex}/` +
        `${this.shop.typeIndex}/` +
        `${this.product.productIndex}?headName=` +
        `${this.product.name}`
      }
    },
  }
</script>