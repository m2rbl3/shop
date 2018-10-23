<template>
  <div class="search bgcolor-blue">
    <div class="input-wrap">
      <i class="iconfont input-icon">&#xe651;</i>
      <input @keyup.enter="loadSearchResult" class="search-input">
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
      async loadSearchResult(e){
        await this.$store.dispatch('LOAD_SEARCH_RESULT', e.target.value);
        this.$router.push('/search');
      }
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