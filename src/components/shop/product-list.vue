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
        this.$router.push('/product');
          // ?'
          // +`&shopID=${_self.$route.query.shopID}`
          // +`&shopIndex=${_self.$route.query.shopIndex}`
          // +`&chooseType=${_self.typeIndex}`
          // +`&productIndex=${productIndex}`
          // +`&headName=${productName}` 
        // );
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

  }
}

  .product {
    margin: .05rem;
  }

    .product-pic {
      height: .5rem;
      width: .5rem;
      & img{
        max-height: 100%;
      }
    }

    .product-name {
      text-align: center;
    }

</style>