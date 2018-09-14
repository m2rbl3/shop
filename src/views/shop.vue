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
    components: {ProductTypeList,ProductList}
  }
</script>

<style scoped>
  .shop {
    margin-top: .4rem;
    height: calc(100vh - .4rem);
  }
</style>
