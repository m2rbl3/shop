/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-09-07 09:01:33
 * @version $Id$
 */
// function curry(fn,...args){
//   if(arg.length < fn.length)
// }
// var shop1 = {
//   name:'1',
//   shopID:1,
//   products:[
//     {
//       id:1,
//       name:'手机',
//       count:1,
//       price:100
//     }
//   ]
// }

// var shop2 = {
//   name:'2',
//   shopID:2,
//   products:[
//     {
//       id:1,
//       name:'手机',
//       count:2,
//       price:100
//     }
//   ]
// }

// var shops =[shop1,shop2];
// var cartShops = [shop1,shop2];
// var cartShops = [{
//   name:'1',
//   shopID:1,
//   products:[
//     {
//       id:2,
//       name:'电脑',
//       count:1,
//       price:100
//     }
//   ]
// }, {
//     name:'1',
//   shopID:3,
//   products:[
//     {
//       id:1,
//       name:'手机',
//       count:1,
//       price:100
//     }
//   ]
// }];

export function addCartShop( shop, cartShops ) {
  if(cartShops.every(cartShop => cartShop.shopID !== shop.shopID)) //没用重复的店直接推进数组
    cartShops.push( shop ); 
  else {
    cartShops = cartShops.map( (cartShop) => {
      if( shop.shopID == cartShop.shopID )
        cartShop.products.forEach( (cartProduct,cpi) => {
          shop.products.forEach( (product,pi) => {
             /*同一店，重复商品则数目加一
*/            if( cartProduct.id == product.id) {         
              cartShop.products[cpi].count += shop.products[pi].count;
            }
            /*没有重复商品，直接推商品*/
            else cartShop.products.push( product ); 
          });
      });
      return cartShop;
   });
  } 
  return cartShops;
}

export function addCartShops(shops,cartShops,callback){
  shops.forEach(shop => {
    callback(shop,cartShops);
  });
}

addCartShops(shops,cartShops,addCartShop);
console.log(cartShops);
