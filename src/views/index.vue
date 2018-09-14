<template>
  <div>
    <VHeader></VHeader>
    <div class="shop-list">
      <ul>
        <li @click="loadTypeProduct(shop.shopID,shopIndex)" v-for="(shop,shopIndex) in shops" class="shop">
          <div class="shop-pic">
            <img :src="shop.picSrc">
          </div>
          <div class="shop-name">{{shop.name}}</div>
        </li>
      </ul>
    </div>
    <div class="loading" v-show="isLoading">Loading...</div>
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import VHeader from '@/components/v-header'
  export default {
    name: 'shop',
    computed: {
      isLoading(){
        return this.shops === undefined? true: false;
      },
      ...mapState({
        shops: 'shops' /* vuex shop.js*/
      })
    },
    methods:{
      loadTypeProduct(shopID,shopIndex){
        const _self = this; 
        this.$store.commit('LOAD_SHOP_TYPE',shopIndex);
        this.$router.push(`/shop?headName=${_self.$store.state.chooseShop.name}`);
      }
    },
    created() {
      this.$store.dispatch('LOAD_SHOP_LIST');
    },
    // update(){
    //   this.$store.commit('LOAD_SHOP_LIST',this.shops);
    //   this.$store.dispatch('LOAD_SHOP_LIST');
    // },
    // beforeRouteUpdate(to,from,next){
    //   console.log(this.beforeRouteUpdate);
    // },
    // beforeRouteEnter(to,from,next) {
    //    next( vm =>{
    //     vm.$store.dispatch('LOAD_SHOP_LIST');
    //   });
    // }
  }
</script>

<style scoped>
  .shop-list {
    & ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
  }

  .shop {
    background-color: white;
    margin: .05rem ;
  }

  .shop-pic {
    height: .5rem;
    width: .5rem;
    & img {
      max-width: 100%;
    }
  }
  
  .shop-name {
    text-align: center;
    font-size: 20px;
    color: blue;
  }
  
  .loading {
    position:fixed;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
  }
</style>