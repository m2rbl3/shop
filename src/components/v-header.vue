<template>
  <header class="shop-header">
    <a @click="back" class="order-back btn--a">
      <span class="icon-back"><</span>
    </a>
    <div class="header-title">{{head}}
    </div>
  </header>
</template>

<script>
  import vue from 'vue'  
  export default {
    name: 'TheHeader',
    data(){
      return{
        head: 'head',
        isBack: false
      }
    },
    beforeRouteEnter(to,from,next){
      if(to)
      next( vm => vm.head = to.query.headName);
    },
    beforeRouteUpdate(to,from,next){
      if(this.isback) this.head = this.$route.matched[0].query.headName;
      if(to) this.head = to.query.headName;
      next();
    },
    methods:{
      back(){
        this.isBack = true;
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
.shop-header {
  height: .4rem;
  position: fixed;
  top: 0;
  left: 0;right: 0;
  z-index: 1;
  display: flex;
  background-color: #FFF;
  font-size: 0;
  text-align: center;
  border-bottom: 1px solid gray;
}

.order-back {
  height: 100%;
  width: 30%;
  display: flex;
  position: absolute;
  left: 0;top: 0;
  font-size: 0;
}
  .icon-back {
    margin: auto;
    margin-left: .05rem;
    font-size: .3rem;
  }

.header-title {
  margin: auto;
  font-size: 30px;
}
</style>
