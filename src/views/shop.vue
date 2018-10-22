<template>
  <div class="shop">
    <ProductTypeList></ProductTypeList>
    <ProductList></ProductList>
  </div>
</template>

<script>
  import VHeader from '@/components/v-header'
  import ProductTypeList from '@/components/shop/product-type-list'
  import ProductList from '@/components/shop/product-list'

  export default {
    name: "shop",
    components: { ProductTypeList, ProductList }
  }
</script>

<style scoped>
  .shop {
    margin: .4rem auto;
    height: calc(100vh - .8rem);
  }
</style>