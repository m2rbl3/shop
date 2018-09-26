const mongoose = require('mongoose')
const users = "mongodb://localhost/users"
module.exports = () => {
  mongoose.connect(users)
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('数据库连接异常')
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(users);
      } else {
        reject(err);
        throw new Error('数据库无法重连')
      }
    })
    mongoose.connection.on('error', err => {
      console.log('数据库错误')
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(users);
      } else {
        reject(err);
        throw new Error('数据库错误')
      }
    })
    mongoose.connection.once('open', () => {
      console.log('数据库链接成功')
      resolve();
    })
  })
}
