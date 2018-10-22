const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
  _id: Schema.Types.ObjectId,
  un: String,
  orders: [{
    orderId: Schema.Types.ObjectId,
    time: Number,
    shops: String
  }]
});

module.exports = mongoose.model('order', ordersSchema);
