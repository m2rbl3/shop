<template>
  <router-link :to="shopURL" class="shop-name">
    <i class="iconfont">&#xe601;&nbsp;</i>{{shopName}}
  </router-link>
</template>

<script>
  export default {
    name: '商店链接跳转',
    props: ['shopIndex','shopName'],
    computed: {
      shopURL(){
        return `/shop/${this.shopIndex}/0?headName=${this.shopName}`
      }
    },
  }
</script>

<style scoped>
.shop-name {
  margin-left: 1em;
  display: inline-block;
}
</style>

