<template>
  <div v-show="isShowDialog" class="shadow">
    <div class="dialog">
      <div class="dialog-text"><span><slot></slot></span></div>
      <div @click="toShowDialog(false)" class="dialog-determine">确定</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isShowDialog: false
      }
    },
    methods: {
      toShowDialog(boolean){
        this.isShowDialog = boolean;
      }
    }
  }
</script>

<style scoped>
.shadow {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}

.shadow::after {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.dialog {
  width: 50%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
  white-space: normal;
  background-color: white;
  border-radius: 0.05rem;
  & .dialog-text {
    line-height: 2;
    & .dialog-text > span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  & .dialog-determine {
    padding: 0.5em 0;
    font-size: 14px;
    border-top: 1px solid;
    color: blue;
  }
}
</style>

