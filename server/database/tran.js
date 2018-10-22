const Shop = require('./schema/shop.js');
const ShopTypes = require('./schema/shopTypes')
const mockData = require('../mock/mock.js');
const connect = require('./connect.js');

(async ()=>{
  await connect();
  mockData.list.forEach(async shop => {
    await new ShopTypes({types: [...shop.types]}).save();
    await new Shop({
      name: shop.name,
      shopID: shop.shopID,
      picSrc: shop.picSrc
    }).save()
      .then(console.log(shop.name));
  });
})();

console.log('成功');