<template>
  <router-link :to="shopURL" class="shop-name">
    <i class="iconfont">&#xe601;</i>{{shop.name}}
  </router-link>
</template>

<script>
  export default {
    name: '商店链接跳转',
    props: ['shop'],
    computed: {
      shopURL(){
        return `/shop/${this.shop.shopIndex}/0?headName=${this.shop.name}`
      }
    },
  }
</script>

<style scoped>
.shop-name {
  margin-left: 0.5em;
  display: inline-block;
}
</style>

