<template>
  <div class="search bgcolor-blue">
    <div class="input-wrap">
      <i class="iconfont input-icon">&#xe651;</i>
      <input @change="loadSearchResult" class="search-input">
      <!-- <ul class="search-list">
        <li :key="item.id" v-for="item in searchResultList" class="search-item">
          <a @click="goResult(item.id)">{{item.name}}</a>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
  export default {
    name:'搜索',
    data(){
      return {
        searchResultList: []
      }
    },
    methods: {
      loadSearchResult(e){
        let value = e.target.value;
        this.axios.get(`/search?value=${value}`)
          .then(res => this.searchResultList = res.data);
      },
      // async goResult(id){
      //   // this.$router.push('product')
      // }
    }
  }
</script>

<style scoped>
  .search {
    padding: .5em 1em;
  }

  .input-wrap {
    background-color: #3f6ed9;
    cursor: text;
    border-radius: 5px;
    white-space: nowrap;
  }

  .search-input {
    height: 1em;
    margin: .5em auto;
    font-size: 20px;
    outline: none;
    background-color: transparent;
    color: white;
  }

  .input-wrap:hover {
    background-color: #175ac1;
  }

  .input-icon {
    font-size: 20px;
    color: white;
    margin: 0 1em;
    /*position: absolute;*/
  }
</style>