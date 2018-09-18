<template>
  <div class="product-list">
    <ul>
      <li @click="loadProductDetail(productIndex,product.name)" v-for="(product,productIndex) in products" class="product">
        <div class="product-pic">
          <img :src="product.picSrc">
        </div>
        <h3 class="product-name">{{product.name}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState,mapGetters } from 'vuex'
  export default {
    name:'product-list',
    computed: {
      ...mapState({
        typeIndex: 'chooseTypeIndex'
     }),
      ...mapGetters({
        products: 'products'
      })
    },
    methods:{
      loadProductDetail(productIndex,productName){
        const _self = this;
        this.$store.commit('LOAD_PRODUCT_DETAIL',productIndex);
        this.$router.push(`/product?headName=${productName}`);
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