const connect = require('./connect')
const Order = require('./schema/order')
const ObjectId = require('mongoose').Types.ObjectId

exports.upload = async ({un, shops}) => {
  await connect();
  let doc = await Order.findOne({un}).exec().then(doc => {
      if(!doc) {
        console.log(`${un}创建新账单`);
        return new Order({un, orders: []});
      } else {
        console.log(`${un}无需创建新账单`);
        return doc;
      }
    });

  doc.orders.push({
    time: Date.now(),
    shops: JSON.stringify(shops)
  });

  return new Promise((res,rej) => {
    doc.save(err => {
      if(err) {
        console.error(err);
        res(500);
      } else {
        console.log(`${un}上传订单成功`);
        res(200);
      }
    })
  })
};

exports.download = async ({un}) => {
  await connect();
  return Order.findOne({un}).exec().then(doc => {
    if(doc){
      /* 初始化order数据 */
      const orders = doc.orders.map(order => {  
        let interval = (Date.now() - order.time) / 3600000;
          interval > 24
          ? interval = `${Math.floor(interval / 24)}天前`
          : interval = `${Math.floor(interval)}小时前`;
        const shops = JSON.parse(order.shops);
        return {_id: order._id, time: interval, shops};
      }).reverse();

      console.log(`${un}下载订单成功`);
      return ({un: doc.un, orders});
    } else return 500;
  });
};

exports.delete = async ({un, _id}) => {
  await connect();
  return Order.findOneAndUpdate({ un },{ $pull: { orders: { _id }}}).exec()
    .then(result => {
      if(result) {
        console.log(`${un}的${_id}删除成功`);
        return 200;
      } else return 500;
    });
};