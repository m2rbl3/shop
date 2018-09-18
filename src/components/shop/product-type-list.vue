<template>
  <div class="product-type">
    <ul>
      <li v-for="(type,typeIndex) in shop.types" @click="loadTypeProduct(typeIndex)" class="list-product-type">{{type.name}}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name:'productTypeList',
    computed: {
      ...mapState({
        shop: 'chooseShop'
      })
    },
    methods: {
      loadTypeProduct(typeIndex) {
        this.$store.commit('LOAD_PRODUCT_TYPE',typeIndex);
      }
    },
    beforeCreate(){
      this.$store.commit('LOAD_PRODUCT_TYPE',0);
    },
    updated(){
      this.$store.commit('LOAD_PRODUCT_TYPE',0);
    },
  }
</script>

<style scoped>
.product-type {
  float: left;
  width: 30%;
  height: 100%;
  background-color: #DDD;
  overflow: auto;
}

  .list-product-type {
    font-size: 20px;
    padding: .5em 0;
    text-align: center;
  }

  .list-product-type:hover {
    background-color: #175ac1;
    color: white;
  }
</style>