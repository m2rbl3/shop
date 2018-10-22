<template>
  <div class="product-list">
    <ul>
      <li @click="goProductDetail(productIndex, product.name)" 
        :key="product.productId" v-for="(product, productIndex) in type.products" 
        class="product">
        <div class="product-pic">
          <img :src="product.picSrc">
        </div>
        <h3 class="product-name">{{product.name}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:'product-list',
    computed: {
      ...mapState({
        type: 'chooseType',
     }),
    },
    methods:{
      goProductDetail(productIndex, productName){
        const shopIndex = this.$route.params.shopIndex,
              typeIndex = this.$route.params.typeIndex;

        this.$router.push(
          `/shop/${shopIndex}` +
          `/${typeIndex}` +
          `/${productIndex}`
        );
      }
    }
  }
</script>

<style scoped>
.product-list {
  height: 100%;
  display: flex;
  overflow: auto;
  background-color: #FFF;
  & ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
  }
}

  .product {
    width: 45%;
    margin: 2.5%;
    overflow: hidden;
  }

    .product-pic {
      width: 100%;
      & img{
        width: 100%;
      }
    }

    .product-name {
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

</style>