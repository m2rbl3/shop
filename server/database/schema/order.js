const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const orderSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   time: Number,
//   shops: String
// });

const ordersSchema = new Schema({
  _id: Schema.Types.ObjectId,
  un: String,
  orders: [{
    // orderSchema
    _id: Schema.Types.ObjectId,
    time: Number,
    shops: String
  }]
});

module.exports = mongoose.model('order', ordersSchema);
