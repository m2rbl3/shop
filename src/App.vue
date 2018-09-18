<template>
  <div>
    <router-view name="header"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import Vue from "vue"
export default {
  name: 'App'
}
</script>

<style>
  /* CSS重置 */
  body,
  p,
  ul,
  button,
  input,
  h1,h2,h3,h4,h5,h6 {
    padding: 0;
    margin: 0;
    font-weight: 400;
  }
  
  body {
    margin: .4rem auto 0;
    font-size: 16px;
    background-color: rgba(0,0,0,0.1);
  }

  ul,li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    align-items: flex-start;
    text-align: center;
    cursor: pointer;
    background-color: white;
    box-sizing: border-box;
    border: none;
  }

  button:active {
    border-style: none;
  }

  input {
    border: none;
  }

  input:focus {
    outline-offset: 0;
  }

  /*通用样式*/
  a {
    color: black;
    display: block;
    text-decoration: none;
    cursor: pointer;
  }

  .bgcolor-blue {
    background-color: #6288f7;
  }

  /* 阿里字体图标 */
  .iconfont{
    font-family:"iconfont" !important;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

@font-face {
  font-family: 'iconfont';  /* project id 836978 */
  src: url('//at.alicdn.com/t/font_836978_6q048da1h76.eot');
  src: url('//at.alicdn.com/t/font_836978_6q048da1h76.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_836978_6q048da1h76.woff') format('woff'),
  url('//at.alicdn.com/t/font_836978_6q048da1h76.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_836978_6q048da1h76.svg#iconfont') format('svg');
}
</style>
