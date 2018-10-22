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

/* exports.search = async function ({value}) {
  await connect();
  var search = new RegExp(`\\w*${value}\\w*`, 'g');
  return ShopTypes.find({'shop.types.products.productName': search}).exec()
    .then(val => {
      console.log(val);
      return val;
    });
}
 */
exports.search = async function({value}) {
  await connect();
  let search = new RegExp(`\\w*${value}\\w*`, 'g');
  
  return ShopTypes.aggregate()
    .match({ "types.products.name": search })
    .unwind("types")
    .match({ "types.products.name": search })
    .unwind("$types.products")
    .match({ "types.products.name": search })
    .then(res => res.map(cv => cv.types.products));

  return ShopTypes.aggregate([{
    $match: { "types.products.name": search }
  }, {
    $unwind: "$types"
  }, {
    $match: { "types.products.name": search }
  }, {
    $unwind: "$types.products"
  }, {
    $match: { "types.products.name": search }
  },])
    .then(res => res.map(cv => cv.types.products));
}