<template>
  <div>
    <div class="footer bgcolor-blue">
      <ul>
        <li class="jump"><router-link class="btn--a" to="/"><i class="icon iconfont">&#xe626;</i>首页</router-link></li>
        <li class="jump"><router-link class="btn--a" to="/cart"><i class="icon iconfont">&#xe602;</i>购物车</router-link></li>
        <li class="jump"><router-link class="btn--a" to="/order"><i class="icon iconfont">&#xe617;</i>我的订单</router-link></li>
        <li class="jump"><router-link class="btn--a" to="/user"><i class="icon iconfont">&#xe6a6;</i>个人中心</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import vue from 'vue'  
  export default {
    name:'footer'
  }
</script>

<style scoped>
  .footer {
    height: .4rem;
    position: fixed;
    bottom: 0;
    left: 0; right: 0;
    & ul{
      height: 100%;
      display: flex;
      flex-direction: row;
      color: white;
    }
  }

  .jump {
    margin: auto;
    display: inline-block;
    & a {
      color: white;
    }
  }
</style>