<template>
<div>
  <SearchInput></SearchInput>
  <div class="search-list" v-if="searchResult.length">
    <ul>
      <li class="list-item"
        :key="item.productName"
        v-for="item in searchResult"
        @click="jumpProduct(item)">
        <div>{{item.shopName}}</div>
        <div>{{item.productName}}</div>
      </li>
    </ul>
  </div>
  <div v-else>无搜索结果</div>
</div>
</template>

<script>
  import SearchInput from '@/components/search-input'
  export default {
    computed: {
      searchResult() {
        return this.$store.state.searchResult;
      }
    },
    methods: {
      jumpProduct(item) {
        this.$router.push(`/shop/` +
          `${item.shopIndex}/` +
          `${item.typeIndex}/` +
          `${item.productIndex}?` +
          `headName=${item.productName}`
        );
      }
    },
    components:{SearchInput}
  }
</script>

<style scoped>
  .search-list {
    height: 10vh - .75rem;
    overflow: auto;
  }

  .list-item {
    height: 1rem;
  }
</style>