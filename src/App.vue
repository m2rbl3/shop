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
  name: 'App',
  methods:{

  }
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

  input[type='text'],
  input:not([type]) {
    border: none;
  }

  input:focus {
    outline-offset: 0;
  }

  /*通用样式*/
  .btn--a {
    display: block;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
</style>
