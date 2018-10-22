<template>
  <div class="shadow" @click="showOff">
    <div class="product-type">
      <div class="preview">
        <img class="preview__pic" :src="chooseProduct.picSrc" >
        <div class="preview__text">
          <p class="price">{{allPrice}}</p>
          <p class="inventory">{{chooseProduct.inventory}}</p>
          <p class="choose-type">已选：{{chooseProduct.name}}</p>
        </div>
        <CartCount></CartCount>
      </div>

      <div class="type-list">
        <form>
          <div class="type-list__item"
            :key="type" v-for="(type,index) in productTypes">
            <input @click="chooseType($event,type)" :id="index" name="product-types" type="radio">
            <label :for="index">{{type}}</label>
          </div>
        </form>
      </div>
      <ProductFooter></ProductFooter>
    </div>
  </div>
</template>

<script>
  import vue from 'vue'
  import ProductFooter from '@/components/product/product-footer'
  import CartCount from '@/components/product/cart-count'
  export default {
    name:'product-type',
    props: ['chooseProduct'],
    computed:{
      productTypes(){
        return this.chooseProduct.types;
      },
      allPrice(){
        return this.$store.state.productCache.allPrice;
      }
    },
    methods: {
      chooseType(e,type){
        this.$store.commit('CHANGE_PRODUCT_CACHE',{key:'type',value:type});
      },
      showOff(e){
        if(e.target.className=='shadow')
        this.$store.commit('SHOW_CHOOSE_TYPE',false);
      }
    },
    brdoreCreate(){
      this.$store.commit('SHOW_CHOOSE_TYPE',false);
    },
    update(){
      this.$store.commit('SHOW_CHOOSE_TYPE',false);
    },
    components:{
      CartCount,ProductFooter
    }
  }
</script>

<style scoped>
  .shadow {
    position: absolute;
    background-color: rgba(0,0,0,.3);
    left: 0; right: 0;
    top: 0; bottom: 0;
  }

  .product-type {
    width: 100%;
    position: fixed;
    bottom: 0;
    font-size: 16px;
    background-color: white;
    box-shadow: 0 1px 1px 0 gray;
  }
    .preview {
      margin: 1em 1em;
      display: flex;
    }
      .preview__pic {
        margin: auto 0;
        height: 5em;
        width: 5em;
      }

      .preview__text {
        margin: auto;
        margin-left: 1em;
      }
        .price {
          font-size: 20px;
          color: red;
        }

        .inventory,
        .choose-type, {
            color: #505050;
        }

    .type-list {
      height: 2.2rem;
      margin: 2em 2em .5rem;
      overflow: auto;
    }

      .type-list__item {
        display: inline-block;
        & input {
          display: none;
        }
        & input:checked + label {
          outline: solid red 1px;
        }
        & label {
          display: inline-block;
          margin: .5em;
          padding: .5em;
          background-color: #EEE;
        }
      }
</style>