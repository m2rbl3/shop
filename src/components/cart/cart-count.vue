<template>
  <div class="change-price">
    <span class="count">
      <button @click="countSub()" class="icon-subtract">-</button>
        <input type="number" v-model="count" class="input-count">
      <button @click="countplus()" class="icon-add">+</button>
    </span>
  </div>
</template>

<script>
  export default {
    props:['productIndex', 'shopIndex'],
    computed:{
      product:{
        get(){
          return this.$store.state.cartShops[this.shopIndex].products[this.productIndex];
        },
        set({prop,val}){
          this.$store.commit('CHANGE_CART_PRODUCT_DATA',{
            shopIndex: this.shopIndex,
            productIndex: this.productIndex,
            prop: prop,
            val: val
          });
        }
      },
      count:{
        get(){
          return this.product.count;
        },
        set(val){
          if(val){
            this.product = {prop: 'count', val: parseInt(val)};
            this.computeAllPrice();
          }
        }
      }
    },
    methods:{
      countSub(){
        this.count = this.product.count > 1 ? ( this.product.count - 1 ) : 1;
      },
      countplus(){
        this.count =  this.product.count + 1;
      },
      computeAllPrice(){
        let allPriceCache = Math.ceil(this.product.price * this.product.count * 100) / 100;
        this.product = {prop: 'allPrice', val: allPriceCache};
      }
  }
}
</script>

<style scoped>
.change-price {
  display: inline-flex;
  justify-content: space-between;
}

.price {
  margin: auto 0;
  font-size: 20px;
  display: inline-block;
  color: red;
}

.price::after {
  content:'元';
}

  .count {
    display: flex;
    overflow: hidden;
  }

  .icon-subtract,.icon-add {
    padding: .5em;
    font-size: 20px;
    line-height: 1;
    background-color: #EEE;
  }

  .icon-subtract:hover,.icon-add:hover {
    background-color: #DDD;
  }

  .input-count {
    width: 2.5em;
    margin: -9999px 0;
    padding: 9999px 0;
    font-size: 25px;
    text-align: center;
  }

.input-count:focus {
  outline-color: red;
}

</style>