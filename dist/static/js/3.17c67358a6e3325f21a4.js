webpackJsonp([3],{"5Bms":function(t,o){},Yzkd:function(t,o){},g5aO:function(t,o){},m3cT:function(t,o){},pGxt:function(t,o,s){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=s("mvHQ"),c=s.n(e),i=(s("7+uW"),{name:"product-footer",computed:{productCache:function(){return this.$store.state.productCache},allPrice:function(){return void 0===this.$store.state.productCache.allPrice&&this.$store.commit("CART_PRODUCT_ALLPRICE",this.productCache.price),this.productCache.allPrice},showChooseType:function(){return this.$store.state.isEjectChooseType},pay:function(){return void 0!==this.productCache.type?"/pay":""}},methods:{addCart:function(){if(void 0!==this.productCache.type){var t=this.$store.state.chooseShop,o=t.name,s=t.shopID,e=JSON.parse(c()({name:o,shopID:s,checked:!1,products:[]}));e.products.push(this.$store.state.productCache),console.log(e),this.$store.commit("ADD_TO_CART",e),this.jumpToCart(),this.$store.commit("PRODUCT_CACHE")}else this.$store.commit("SHOW_CHOOSE_TYPE",!0)},jumpToCart:function(){this.$router.push("/cart?headName=购物车")},checkLogin:function(){this.$store.hasLogin||this.$router.push("/login")}}}),r={render:function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"product-footer"},[s("div",{staticClass:"all-price"},[t._v("总价格："),s("span",{staticClass:"color-red"},[t._v(t._s(t.allPrice))])]),t._v(" "),s("router-link",{staticClass:"buy",attrs:{to:"pay"},on:{click:t.checklogin}},[t._v("购买")]),t._v(" "),s("div",{staticClass:"add-cart btn--a",on:{click:t.addCart}},[t._v("添加进购物车")])],1)},staticRenderFns:[]};var n=s("VU/8")(i,r,!1,function(t){s("g5aO")},null,null).exports,a={computed:{product:function(){return this.$store.state.productCache},count:{get:function(){return this.product.count},set:function(t){t&&(this.$store.commit("CHANGE_PRODUCT_COUNT",parseInt(t)),this.computeAllPrice())}}},methods:{countSub:function(){this.$store.commit("CHANGE_PRODUCT_COUNT",this.product.count>1?this.product.count-1:1),this.computeAllPrice()},countplus:function(){this.$store.commit("CHANGE_PRODUCT_COUNT",this.product.count+1),this.computeAllPrice()},computeAllPrice:function(){this.$store.commit("CART_PRODUCT_ALLPRICE",this.product.price*this.product.count)}}},u={render:function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"change-price"},[s("span",{staticClass:"count"},[s("button",{staticClass:"icon-subtract",on:{click:function(o){t.countSub()}}},[t._v("-")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.count,expression:"count"}],staticClass:"input-count",attrs:{type:"number"},domProps:{value:t.count},on:{input:function(o){o.target.composing||(t.count=o.target.value)}}}),t._v(" "),s("button",{staticClass:"icon-add",on:{click:function(o){t.countplus()}}},[t._v("+")])])])},staticRenderFns:[]};var d={name:"product-type",computed:{chooseProduct:function(){return this.$store.state.chooseProduct},productTypes:function(){return this.chooseProduct.types},allPrice:function(){return this.$store.state.productCache.allPrice}},methods:{chooseType:function(t,o){this.$store.commit("CHANGE_PRODUCT_CACHE",{key:"type",value:o})},showOff:function(t){"shadow"==t.target.className&&this.$store.commit("SHOW_CHOOSE_TYPE",!1)}},brdoreCreate:function(){this.$store.commit("SHOW_CHOOSE_TYPE",!1)},update:function(){this.$store.commit("SHOW_CHOOSE_TYPE",!1)},components:{CartCount:s("VU/8")(a,u,!1,function(t){s("5Bms")},"data-v-78544179",null).exports,ProductFooter:n}},p={render:function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"shadow",on:{click:t.showOff}},[s("div",{staticClass:"product-type"},[s("div",{staticClass:"preview"},[s("img",{staticClass:"preview__pic",attrs:{src:t.chooseProduct.picSrc}}),t._v(" "),s("div",{staticClass:"preview__text"},[s("p",{staticClass:"price"},[t._v(t._s(t.allPrice))]),t._v(" "),s("p",{staticClass:"inventory"},[t._v(t._s(t.chooseProduct.inventory))]),t._v(" "),s("p",{staticClass:"choose-type"},[t._v("已选："+t._s(t.chooseProduct.name))])]),t._v(" "),s("CartCount")],1),t._v(" "),s("div",{staticClass:"type-list"},[s("form",t._l(t.productTypes,function(o,e){return s("div",{staticClass:"type-list__item"},[s("input",{attrs:{id:e,name:"product-types",type:"radio"},on:{click:function(s){t.chooseType(s,o)}}}),t._v(" "),s("label",{attrs:{for:e}},[t._v(t._s(o))])])}))]),t._v(" "),s("ProductFooter")],1)])},staticRenderFns:[]};var h={name:"product",computed:{chooseProduct:function(){return this.$store.state.chooseProduct},isEject:function(){return this.$store.state.isEjectChooseType}},methods:{showChooseType:function(){this.$store.commit("SHOW_CHOOSE_TYPE",!0)}},created:function(){this.$store.commit("SHOW_CHOOSE_TYPE",!1)},update:function(){this.$store.commit("SHOW_CHOOSE_TYPE",!1)},components:{chooseProductType:s("VU/8")(d,p,!1,function(t){s("m3cT")},"data-v-0fb51e2c",null).exports,ProductFooter:n}},l={render:function(){var t=this,o=t.$createElement,s=t._self._c||o;return s("div",{staticClass:"product"},[s("div",{staticClass:"product-pic"},[s("img",{attrs:{src:t.chooseProduct.picSrc}})]),t._v(" "),s("div",{staticClass:"product-text"},[s("div",{staticClass:"title"},[t._v(t._s(t.chooseProduct.name))]),t._v(" "),s("div",{staticClass:"price"},[t._v(t._s(t.chooseProduct.price))]),t._v(" "),s("div",{staticClass:"other"},[s("div",[t._v("快递费"+t._s(t.chooseProduct.expressPrice))]),t._v(" "),s("div",[t._v("月销量"+t._s(t.chooseProduct.monthlySales))]),t._v(" "),s("div",[t._v("地址"+t._s(t.chooseProduct.address))])])]),t._v(" "),s("div",{staticClass:"btn--choose-type",on:{click:t.showChooseType}},[t._v("请选择商品类型")]),t._v(" "),s("div",{staticClass:"product-detail"},[t._v(t._s(t.chooseProduct.detail))]),t._v(" "),s("chooseProductType",{directives:[{name:"show",rawName:"v-show",value:t.isEject,expression:"isEject"}]}),t._v(" "),s("ProductFooter")],1)},staticRenderFns:[]};var _=s("VU/8")(h,l,!1,function(t){s("Yzkd")},"data-v-789e23a8",null);o.default=_.exports}});
//# sourceMappingURL=3.17c67358a6e3325f21a4.js.map