<template>
  <div class="pay">
    <div class="pay-box">
      <span class=pay-success>✔支付成功</span>
      <p class="return-index">正在返回主页面...</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:'付款',
    mounted(){
      const _self = this;
      setTimeout( function(){
        _self.$router.replace('/');
      }, 3000);
    },
    methods:{
      clearCart(){
        this.$store.commit('CLEAR_CART')
      }
    }
  }
</script>

<style scoped>
.pay-box {
  position: absolute;
  top: 0;bottom: 0;
  left: 0;right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white; 
  outline: yellow solid 1px;
}

  .pay-success {
    font-size: 30px;
    display: inline-block;
    color: green;
  }

  .return-index{
    font-size: 20px;
  }
</style>