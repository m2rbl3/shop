const connect = require('./connect')
const Order = require('./schema/order')
const ObjectId = require('mongoose').Types.ObjectId

exports.upload = async ({un, shops}) => {
  await connect();
  return new Promise (async (res, rej) => {
    try{
      var doc = await Order.findOne({un})
        .then(doc => {
          if(!doc) {
            console.log(`${un}创建新账单`);
            return new Order({un, orders: []});
          } else {
            console.log(`${un}无需创建新账单`);
            return doc;
          }
        });
      await doc.orders.push({time: Date.now(), shops: JSON.stringify(shops)});
      doc.save(err => {
        if(err) console.error(err);
        else {
          res(200);
          console.log(`${un}上传订单成功`);
        }
      });
    } catch(e){
      console.error(e);
      res(500);
    }
  });
}

exports.download = async ({un}) => {
  await connect();
  return new Promise((res, rej) => {
    try {
      Order.findOne({un},(err, doc) => {
        if(err) console.error(err);
        else if(doc){
        
          /* 初始化order数据 */
          const orders = doc.orders.map(order => {  
            let interval = (Date.now() - order.time) / 3600000;
             interval > 24
              ? interval = `${Math.floor(interval / 24)}天前`
              : interval = `${Math.floor(interval)}小时前`;
            const shops = JSON.parse(order.shops);
            return {_id: doc._id, time: interval, shops};
          });

          res({un: doc.un, orders});
          console.log(`${un}下载订单成功`);
        }
        else res(500);
      });
    } catch(e){
      console.error(e);
    }
  });
}

exports.delete = async ({un, _id}) => {
  await connect();
  return new Promise((res, rej) => {

    Order.findOneAndUpdate({un}, 
      {$pull: {orders: {_id}}},
      async (err, result) => {
        if(err) console.error(err);
        else if(result) {
          console.log(result);
          res(200);
          console.log(`${un}的${_id}删除成功`);
        } else res(500);
      })

    Order.findOne({un}).then(doc => {
      if(doc) {
        doc.orders.pull({_id});
        doc.markModified('orders');
        doc.save(err => {
          if(err) {
            console.error(err);
          } else {
            res(200);
            console.log("删除成功");
          }
        });
      }
    });

  })
}