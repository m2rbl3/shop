<template>
<div>
  <div class="user__header">
    <div class="user__avatar">
      <img class="avatar__img">
    </div>
<!-- <div class="user__button--setting">
      <router-link to="">设置</router-link>
    </div> -->
    <div class="user__username"><p>{{$store.state.name}}</p></div>
  </div>

  <div class="user__order-act">
    <ul>
      <li :key="orderType.to" v-for="orderType of orderTypes"><router-link :to="orderType.to" class="btn--a"><img>{{orderType.type}}</router-link></li>
    </ul>
  </div>

  <div class="user__nav">
    <ul>
      <li :key="nav.to" v-for="nav of navs">
        <router-link :to="nav.to" class="nav__list btn--a"><img class="icon">{{nav.type}}<span class="icon--go">&#155;</span></router-link>
      </li>
    </ul>
  </div>

  <a @click="logout" class="btn--a user__quit">退出登录</a>
</div>
</template>

<script>
export default {
  data() {
    return {
      orderTypes: [
        {
          type: "全部订单",
          to: "/order"
        }
      ],
      navs: [
        {
          type: "全部订单",
          to: "/order"
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push('/login');
    }
  }
};
</script>
  
<style scoped>
.user__header {
  height: 1.2rem;
  overflow: hidden;
  background-color: #3f6ed9;
  font-size: 14px;
  position: relative;
}

.user__avatar {
  float: left;
  height: 0.8rem;
  width: 0.8rem;
  margin: 0.2rem 0.2rem 0rem 0.2rem;
  border-radius: 50%;
  background-color: transparent;
  & .avatar__img {
    height: 0.8rem;
    width: 0.8rem;
  }
}

.user__username {
  width: 1.75rem;
  font-size: 20px;
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: white;
}

.user__button--setting {
  float: right;
  margin: 0.6rem 0.2rem 0;
  transform: translateY(-50%);
  color: white;
  padding: 0.2em 0.5em;
  line-height: 14px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: calc(0.25 * (14px + 0.2rem));
}

.user__order-act {
  margin: 0.1rem 0;
  & ul {
    display: flex;
    background-color: white;
    & li {
      font-size: 14px;
      float: left;
      width: 20%;
      & a {
        margin: 0.5em auto;
        text-align: center;
        & img {
          height: 0.4rem;
        }
      }
    }
  }
  & ul::after {
    clear: both;
    content: "";
    display: block;
  }
}

.user__nav {
  background-color: white;
  margin: 0.1rem 0;
  & .nav__list {
    display: flex;
    height: 0.3rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
    line-height: 0.3rem;
    & .icon {
      margin: auto 0.2rem auto 0.1rem;
      height: 0.2rem;
      width: 0.2rem;
    }
    & .icon--go {
      font-size: 20px;
      line-height: 0.3rem;
      color: #404040;
      margin: auto;
      margin-right: 0.1rem;
    }
  }
}

.user__quit {
  width: 60%;
  margin: 0.1rem auto;
  padding: 5px 5px;
  border: 1px solid red;
  border-radius: 25px;
  font-size: 20px;
  background-color: red;
  color: white;

  text-align: center;
}

.user__quit:hover {
  background-color: transparent;
  color: red;
}
</style>