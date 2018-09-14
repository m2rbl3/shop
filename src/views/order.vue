<template>
  <div class="order">
    <VHeader></VHeader>
    <div class="order-list">

      <div v-for="shop in shops" class="shop">
        <router-link :to="shop.to" class="shop-name btn--a">{{shop.name}}</router-link>
        <div v-for="product in shop.products" class="product-list">
          <div class="product">
            <div class="product-pic">
              <img :src="product.picSrc">
            </div>
            <div class="product-detail">{{product.name}}</div>
            <div class="price-wrap">
              <p class="product-price">{{product.price}}元</p>
              <p class="product-count">x{{product.count}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="all-price">合计100元</div>
    </div>
  </div>
</template>

<script>
  import VHeader from '@/components/v-header' 
  export default {
    name:'order',
    data(){
      return {
        shops:[{
          id:1,
          name:'狗屎',
          to:"/cart",
          products:[{
              id:4,
              picSrc:'//img.alicdn.com/tfs/TB1.2hkSFXXXXblapXXXXXXXXXX-184-184.png',
              name: '屎',
              type: "好吃的",
              count:"1",
              price:"1"
            }, {
              id:2,
              name: '屎',
              type: "好吃的",
              count:"1",
              price:"1"
            }, {
              id:3,
              name: '屎',
              type: "好吃的",
              count:"1",
              price:"1"
            }]
        }]
      }
    },
    components: {
      VHeader
    }
  }
</script>

<style scoped>
  .order-list {
    margin:.1rem auto;
    padding: .1rem 0;
    background-color: white;
  }

  .shop {
    border-bottom: 1px solid #DDD;
  }

  .shop-name {
    padding: .5em;
  }

  .shop-name::after {
    content: '>';
    margin: .5em auto;
  }
  
  .product {
    display: flex;
    background-color: #EEE;
  }
  
  .product-pic{
    margin: .1rem 0 .1rem .1rem;
    height: 1rem;
    width: 1rem;
    & img {
      max-width: 100%;
    }
  }

  .product-detail {
    margin: auto .1rem;
  }

  .price-wrap {
    margin: auto;
    margin-right: .1rem;
    text-align: center;
    white-space: nowrap;
  }

  .product-price {
    font-weight: 800;
    color: red;
  }

  .product-count {
    color: #404040;
  }
  
  .all-price {
    margin:.5em 1em;
    font-weight: 800;
    text-align: right;
  }
</style>