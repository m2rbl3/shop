<template>
  <div class="shop">
    <VHeader></VHeader>

    <div class="product-type">
      <ul>
        <li v-for="(type,typeIndex) in shop.types" @click="loadTypeProduct(typeIndex)" class="list-product-type">{{type.name}}</li>
      </ul>
    </div>

    <div class="product">
      <ul>
        <li @click="loadProductDetail(productIndex)" v-for="(product,productIndex) in products" class="product-list">
          <div class="product-pic">
            <img :src="product.picSrc">
          </div>
          <h3 class="product-name">{{product.name}}</h3>
        </li>
      </ul>
    </div>   
  </div>
</template>

<script>
  import VHeader from '@/components/v-header'
  import ProductTypeList from '@/components/shop/product-type-list'
  import ProductList from '@/components/shop/product-list'
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: "chooseshop",
    computed: {
      ...mapState({
        shop: 'chooseShop',
        typeIndex: 'chooseTypeIndex'
      }),
      ...mapGetters({
        products: 'products'
      })
    },
    methods:{
      loadTypeProduct(typeIndex) {
        this.$store.commit('LOAD_PRODUCT_TYPE',typeIndex);
      },
      loadProductDetail(productIndex){
        const _self = this;
        this.$store.commit('LOAD_PRODUCT_DETAIL',productIndex);
        this.$router.push(`/product?shopIndex=${_self.$route.query.shopIndex}`
          +`&chooseType=${_self.typeIndex}`
          +`&productIndex=${productIndex}` 
        );
      }
    },
    beforeCreate(){
      const _self = this;
      if(this.$store.state.shops.length === 0)
      this.$store.dispatch('LOAD_SHOP_LIST').then(function(){
          _self.$store.commit('LOAD_SHOP_TYPE',_self.$route.query.shopIndex);
          _self.$store.commit('LOAD_PRODUCT_TYPE',0);
      });
      else this.$store.commit('LOAD_PRODUCT_TYPE',0);
    },
    update(){
      this.$store.commit('LOAD_PRODUCT_TYPE',0);
    },
    components:{VHeader}
  }
</script>

<style scoped>
.product-type {
  float:left;
  width: 30%;
  margin-right: .1rem;
  background-color: #DDD;
}

  .list-product-type {
    margin: .5em;
  }

.product {
  display: flex;
  background-color: #FFF;
}

  .product-list {
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