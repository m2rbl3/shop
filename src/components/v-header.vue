<template>
  <header class="shop-header bgcolor-blue">
    <a @click="back" class="order-back">
      <span class="icon-back iconfont">&#xe600;</span>
    </a>
    <div class="header-title">{{head}}
    </div>
  </header>
</template>

<script>
  import vue from 'vue'  
  export default {
    name: 'TheHeader',
    computed: {
      head(){
        if(this.$route.query.headName)
          return this.$route.query.headName;
        else if(this.$route.name)
          return this.$route.name;
      }
    },
    methods:{
      back(){
        if(this.$route.path === '/login')
          this.$router.push(this.$store.state.fromPath);
        else this.$router.go(-1);
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
  font-size: 0;
  text-align: center;
}

.order-back {
  height: 100%;
  width: 30%;
  display: flex;
  position: absolute;
  left: 0;top: 0;
  font-size: 0;
  color: white;
}
  .icon-back {
    margin: auto;
    margin-left: .5em;
    font-size: .25rem;
  }

.header-title {
  margin: auto;
  font-size: .25rem;
  vertical-align: middle;
  line-height: .4rem;
  color: white;
}
</style>
