const connect = require('./connect')
const Shop = require('./schema/shop')
const ShopTypes = require('./schema/shopTypes')

exports.shopList = async function () {
  await connect();
  return Shop.find().exec()
    .then(result => result);
}

exports.typesOfShop = async function ({shopIndex}) {
  await connect();
  return ShopTypes.find().exec()
    .then(shop => shop[shopIndex].types);
}

exports.chooseTypeProducts = async function ({shopIndex,typeIndex}) {
  await connect();
  return ShopTypes.find().exec()
    .then(shop => shop[shopIndex].types[typeIndex]);
}

exports.chooseProduct = async function ({shopIndex, typeIndex, productIndex}) {
  await connect();
  return ShopTypes.find().exec()
    .then(shop => shop[shopIndex].types[typeIndex].products[productIndex]);
}

exports.search = async function({value}) {
  await connect();
  let search = new RegExp(`\\w*${value}\\w*`, 'g');
  let result = [];

  console.log(`正在搜索${value}`);

  await ShopTypes.find().exec().then(shops => {
    shops.forEach((shop, shopIndex) => {
      shop.types.forEach((type, typeIndex) => {
        type.products.forEach((product, productIndex) => {
          if(~product.name.search(search)){
            let shopName = "";
            Shop.find().exec().then(shops => {
              shopName = shops[shopIndex].name;
            });
            result.push({
              shopName,
              productName: product.name,
              shopIndex,
              typeIndex,
              productIndex
            });
          }
        });
      });
    });
  });
  return result;
  /*   return ShopTypes.aggregate()
    .match({"types.products.name": search})
    .unwind("types")
    .match({"types.products.name": search})
    .unwind("types.products")
    .match({"types.products.name": search})
    .then(res => res.types.product)
} */
}

