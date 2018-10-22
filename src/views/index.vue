<template>
  <div>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else class="index">
      <search></search>
      <!-- <swiper></swiper> -->
      <div class="shop-list">
        <ul>
          <li @click="pushShopPage(shopIndex, shop.name, shop.shopID)" 
            :key="shop.shopID" v-for="(shop,shopIndex) in shops"
            class="shop">
            <div class="shop-pic">
              <img :src="shop.picSrc">
            </div>
            <div class="shop-name">{{shop.name}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Vue from 'vue'
  import swiper from '@/components/index/swiper'
  import search from '@/components/index/search'

  export default {
    name: 'shop',
    computed: {
      isLoading(){
        return this.shops.length === 0 ? true : false;
      },
      ...mapState({
        shops: 'shops'
      })
    },
    methods:{
      pushShopPage(shopIndex, shopName, shopID){
        this.$router.push(`/shop/${shopIndex}/0?headName=${shopName}`);
      }
    },
    beforeCreate() {
      this.$store.dispatch('LOAD_SHOP_LIST');
    },
    components:{
      swiper, search
    }
  }
</script>

<style scoped>
  .index {
    height: calc(100vh - .8rem);
    margin-bottom: .4rem;
    overflow: hidden;
  }

  .shop-list {
    background-color: white;
    height: 100%;
    /* height: calc(100% - 1.9rem); */
    & ul{
      height: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
  }

  .shop {
    width: 100%;
    margin: .05rem;
    display: flex;
    flex-direction: row;
    background-color: white;
  }

  .shop-pic {
    height: .5rem;
    width: .5rem;
    text-align: center;
    & img {
      max-width: 100%;
    }
  }
  
  .shop-name {
    margin: auto;
    margin-left: .5rem;
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