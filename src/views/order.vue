<template>
<div class="orders">
  <div :key="order._id" v-for="order in orders" class="order-list">
    <div>
      <div class="order-time"><i class="iconfont">&#xe6ed;</i>{{order.time}}</div>
      <!-- <div @click="delOrder(order._id)">删除</div> -->
    </div>
      <div class="shop-list">
        <div :key="shop.shopID" v-for="(shop, shopIndex) in order.shops" class="list-shop">

          <!-- 不同的店列表 -->
          <div class="shop-module">
            <router-link :to="'/shop/' + shopIndex + '?headName=' + shop.name" class="shop-name"><i class="iconfont">&#xe601;</i>{{shop.name}}</router-link>
          </div>

          <!-- 同一家店的商品列表 -->
          <ul>
            <li :key="product.productID" v-for="product in shop.products" class="list-product">

              <div class="pic-wrap">
                <img :src="product.picSrc" class="preview-pic">
              </div>

              <div class="product-module">
                <span class="product-name">{{product.name}}</span><span> x{{product.count}}</span>
                <div class="choose-type btn--a">
                  <span>{{product.type}}</span>
                </div>
                <div class="product-all-price">{{product.allPrice}}</div>
              </div>

            </li>
          </ul>

        </div>
      </div>
    </div>

    <!-- 无订单提示 -->
    <div v-show="noOrders" class="no-product-tip">
      <p class="tip-text">你的订单列表空空如也</p>
    </div>

  </div>
</div>
</template>

<script>
  export default {
    name: '订单',
    data(){
      return {
        orders: []
      }
    },
    computed:{
      noOrders(){
        return !this.orders.length;
      }
    },
    methods:{
      loadOrders(){
        if(this.$store.state.hasLogin){
          this.axios({
            url: 'order/download',
            method: 'post',
            data: {
              un: this.$store.state.un
            }
          }).then(res => {
            this.orders = res.data.orders;
          }).catch(err => console.error(err));
        } else {
          this.$router.push('/login');
        }
      },
      delOrder(_id){
        console.log(_id);
        this.axios({
          url: 'order/delete',
          method: 'post',
          data: {
            un: this.$store.state.un,
            _id
          }
        })
          .then(res => {
            res.data == 200 ? this.loadOrders() : console.log('删除失败') 
          })
          .catch(err => console.error(err));
      }
    },
    created(){
      this.loadOrders();
    },
  }
</script>

<style scoped>
.orders {
  height: calc(100vh - .8rem);
  overflow: auto;
}

.order-list {
  margin: .1rem 0;
}

.order-time {
  font-size: 20px;
  line-height: 2;
  text-align: center;
  color: #7298f7;
  background-color: #fff;
}

.cart-list {
  margin-bottom: .4rem;
}

.list-shop {
  margin: auto;
  font-size: 16px;
  border-top: 1px #6288f7 solid;
  background-color: white;
}

.shop-module {
  padding: .1rem;
  font-size: 20px;
  display: flex;
  border-bottom: 1px solid #ddd;
}

.checkbox {
  font-size: 20px;
  margin: auto 0;
}

.input-choose {
  display: none;
}

.choose-label {
  height: .15rem;
  width: .15rem;
  display: inline-block;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 50%;
}

.input-choose:checked + .choose-label {
  background-color: #6288f7;
}

.shop-name {
  margin-left: .5em;
  display: inline-block;
}

.icon--go {
  margin-left: .5em;
}

.list-product {
  padding: .1rem;
  display: flex;
  flex-direction: row;
}

.list-product + .list-product {
  border-top: 1px solid #ddd;
}

.pic-wrap {
  margin: auto;
  margin-left: .5em;
}

.preview-pic {
  height: 1rem;
  width: 1rem;
}

.product-module {
  margin: auto;
  padding: 0 1em;
  font-size: 18px;
  display: inline-block;
  flex-grow: 1;
}

.choose-type {
  margin: 1em auto;
  background-color: #ddd;
}

.btn-del {
  margin-left: 1em;
  padding: .5em;
  font-size: 20px;
  line-height: 1;
  color: white;
  background-color: red;
}

.payment-module {
  height: .4rem;
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: white;
  text-align: center;
}

.product-all-price {
  width: 60%;
  margin: auto 0;
  font-size: 25px;
  line-height: .4rem;
  flex-grow: 1;
  display: inline-block;
  white-space: nowrap;
  color: red;
}

.product-all-price::after {
  content: "元";
}

.payment {
  margin: auto;
  line-height: .4rem;
  color: white;
  background-color: red;
  flex-grow: 1;
}

.no-product-tip {
  height: 3rem;
  margin: auto;
  padding: ;
  & .tip-text {
    text-align: center;
    font-size: 30px;
    line-height: 3rem;
    vertical-align: middle;
    color: #aaa;
  }
}
</style>