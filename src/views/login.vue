<template>
  <div class="page--login">

    <div class="login__logo"><img></div>

    <form name="login" class="login">

      <div class="login__input--wrap">

        <input v-model="username" class="login__input" type="text" placeholder="请输入用户名">

        <span :style="{visibility:isDisplayUNX}" @click="clearInput('username')" class="login__clear">&#10006;</span>

      </div>

      <div class="login__input--wrap">

        <input  v-model="password" class="login__input" type="password" placeholder="请输入用户密码">

        <span :style="{visibility:isDisplayPWX}" @click="clearInput('password')" class="login__clear">&#10006;</span>

      </div>

    </form>

    <div class="otherlink">

      <router-link to="/register">免费注册</router-link>

      <router-link to="">忘记密码</router-link>

    </div>

    <button @click="login" class="login__submit">登录</button>

    <div v-show="toShowDialog" class="login__shadow">
      <div class="login__dialog">
        <div class="dialog__text"><span>你的用户名或者密码错误</span></div>
        <div @click="cancelDialog" class="dialog__determine">确定</div>
      </div>
    </div>

  </div>
</template>

<script>
  import vue from 'vue'   
  export default {
    data (){
      return {
        username:'',
        password:'',
        isDisplayUNX: 'hidden',
        isDisplayPWX: 'hidden',
        toShowDialog: false,
        fromPath:'/'  //从哪里跳转
      }
    },
    watch:{
      /* 有输入则显示X号*/
      username(){
        if( this.username !== "" ) this.isDisplayUNX='visible'
        else this.isDisplayUNX = 'hidden';
      },
      password(){
        if( this.password !== "" ) this.isDisplayPWX='visible'
        else this.isDisplayPWX = 'hidden';
      }
    },
    beforeRouteEnter(to,from,next){
    /*密码验证*/
      next(vm=>{ vm.fromPath = to.fullPath });
    },
    beforeRouterUpdate(to,from,next){
      this.fromPath = to.fullPath;
      next();
    },
    methods: {
      clearInput( val ) {
        if( typeof val=='string' ) {
          if(val==='username') this.username = '';
          else if(val==='password') this.password = '';
        }
      },
      /*登陆验证*/
      login(){
        this.$store.commit('CHANGE_LOGIN_TOKEN');
        const _self = this;
        this.axios({
          method:'post',
          url: 'http://119.23.212.109/api/login',
          data: {
            username: this.username,
            password: this.password
          }
        }).then( res => {
          if(res) {
            console.log(res);
             _self.store.commit('CHANGE_LOGIN_TOKEN');
             _self.$router.push(this.fromPath);
          }
        }).catch( rej => {
          _self.toShowDialog = true;
        });
      },
      /*隐藏登陆错误对话框*/
      cancelDialog(){
        this.toShowDialog = false;
      }
    }
  }
</script>
 
<style>
  .login__input--wrap {
    display: flex;
    width: 60%;
    margin: 0.5rem auto 0;
    position: relative;
    font-size: 0;
    border-bottom: 1px solid blue;
  }

    .login__input {
      width: 90%;
      margin: 0 0 0.5em 0.5em;
      padding: 0;
      background-color: transparent;
      font-size: 16px;
      border: 0;
    }
    
    .login__input:focus {
      outline: none;
    }

    .login__clear {
      visibility: hidden;
      margin-bottom: 0.5em;
      align-self: flex-end;
      font-size: 16px;
      cursor: pointer;
    }

    .otherlink {
      display: flex;
      justify-content: space-between;
      width: 60%;
      margin: .1rem auto;
      color: gray;
      font-size: 0;
      & a{
       color: gray;
       font-size: 15px;
      }
    }

    .login__submit {
      display: block;
      width: 60%;
      margin: 0.1rem auto;
      padding: 5px 5px;
      border-radius: 25px; 
      text-align: center;
      background-color: green;
      border: 0;
      font-size: 16px;
      color: #FFF;
    }

    .login__shadow {
      position: fixed;
      left: 0; right: 0;
      top: 0; bottom: 0;
      background-color: rgba(0,0,0,0.5);
      text-align: center;
      font-size: 0;
      white-space: nowrap;
      overflow: auto;
    }

    .login__shadow::after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }

    .login__dialog {
      width: 50%;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      font-size: 14px;
      white-space: normal;
      background-color: white;
      border-radius: 0.05rem;
      & .dialog__text {
        line-height: 2;
        & .dialog__text > span {
         display: inline-block;
         vertical-align: middle;
        }
      }
      & .dialog__determine {
        padding: 0.5em 0;
        font-size: 14px;
        border-top: 1px solid;
        color: blue;
      }
    }
</style>