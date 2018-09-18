<template>
  <div v-if="recommon.length">
    <swiper class="swiper" ref="swiper" :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="product in recommon" :key="product.productID">
          <img class="swiper-pics" :src="product.picSrc">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    name:'轮播图',
    data(){
      return {
        swiperOption:{
          pagination:{
            el:'.swiper-pagination',
            clickable: 'true'
          },
          autoplay: true,
          loop:true
        }
      }
    },
    computed:{
      recommon(){
          return this.$store.state.shops[0].types[0].products;
      }
    },
    components:{swiper,swiperSlide}
  }
</script>

<style scoped>
  .swiper {
    height: 1.5rem;
    background-color: white; 
  },
  .swiper-pics {
    width: 100%;
  }
</style>