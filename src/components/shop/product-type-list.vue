<template>
  <div class="product-type">
    <ul>
      <li :key="type.name" v-for="(type, typeIndex) in shop" 
        class="list-product-type" 
        @click="refreshTypeProduct(typeIndex)">
        {{type.name}}
      </li>
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
      refreshTypeProduct(typeIndex) {
        let shopName = this.$route.query.headName,
          shopIndex = this.$route.params.shopIndex;
        this.$router.replace(`/shop/${shopIndex}/${typeIndex}?headName=${shopName}`)
      },
      loadTypeProduct(){
        let shopName = this.$route.query.shopName,
            shopIndex = this.$route.params.shopIndex,
            typeIndex = this.$route.params.typeIndex;
        this.$store.dispatch('LOAD_PRODUCT_TYPES', {
          shopIndex,
          typeIndex
        });
      }
    },
    watch: {
      "$route.path" (to, from) {
        if(to.path == from.path)
          this.loadTypeProduct();
      }
    },
    async created() {
      const shopIndex = this.$route.params.shopIndex;
      await this.$store.dispatch('LOAD_SHOP_TYPES', shopIndex);
      this.loadTypeProduct();
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