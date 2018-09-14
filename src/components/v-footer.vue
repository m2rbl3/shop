<template>
  <div>
    <div class="footer">
      <ul>
        <li class="jump"><router-link class="btn--a" to="/"><i class="icon iconfont">&#xe626;</i>首页</router-link></li>
        <li class="jump"><router-link class="btn--a" to="/cart"><i class="icon iconfont">&#xe602;</i>购物车</router-link></li>
        <li class="jump"><router-link class="btn--a" to="/user"><i class="icon iconfont">&#xe6a6;</i>个人中心</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import vue from 'vue'  
  export default {
    name:'footer',
    data(){
      return{
        
      }
    }
  }
</script>

<style>
  .footer {
    height: .4rem;
    position: fixed;
    bottom: 0;
    left: 0; right: 0;
    background-color: #FFF;
    border-top: 1px solid #555 ;
    & ul{
      height: 100%;
      display: flex;
      flex-direction: row;
    }
  }

  .jump {
    color: yellow;
    margin: auto;
    display: inline-block;
  }

  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  @font-face {
  font-family: 'iconfont';  /* project id 836978 */
  src: url('//at.alicdn.com/t/font_836978_f0fv5ix3tta.eot');
  src: url('//at.alicdn.com/t/font_836978_f0fv5ix3tta.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_836978_f0fv5ix3tta.woff') format('woff'),
  url('//at.alicdn.com/t/font_836978_f0fv5ix3tta.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_836978_f0fv5ix3tta.svg#iconfont') format('svg');
}
</style>