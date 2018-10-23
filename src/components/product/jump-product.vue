<template>
  <router-link :to="productURL" class="product-name">{{productName}}</router-link>
</template>

<script>
  export default {
    name: '商品页面跳转',
    props: ['shopIndex', 'typeIndex', 'productName', 'productIndex'],
    computed:{
      productURL(){
        return `/shop/` +
        `${this.shopIndex}/` +
        `${this.typeIndex}/` +
        `${this.productIndex}?headName=` +
        `${this.productName}`
      }
    },
  }
</script>