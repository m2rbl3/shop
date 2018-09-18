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
    computed:{
      product() {
        return this.$store.state.productCache;
      },
      count:{
        get(){
          return this.product.count;
        },
        set(val){
          if(val){
            this.$store.commit('CHANGE_PRODUCT_COUNT',parseFloat(val));
            this.computeAllPrice();
          }
        }
      }
    },
    methods:{
      countSub(){
        const _self = this; 
        this.$store.commit('CHANGE_PRODUCT_COUNT',
          _self.product.count > 1 ? ( _self.product.count - 1 ) : 1
        );
        this.computeAllPrice();
      },
      countplus(){
        const _self = this; 
        this.$store.commit('CHANGE_PRODUCT_COUNT',_self.product.count + 1);
        this.computeAllPrice();
      },
      computeAllPrice(){
        const _self = this;
        _self.$store.commit('CART_PRODUCT_ALLPRICE',
          _self.product.price * _self.product.count
        );
      }
   }
  }
</script>

<style scoped>
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