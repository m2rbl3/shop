const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopTypesSchema = new Schema({  
  types: [{
    typeId: Schema.Types.ObjectId,
    name: String,
    products: [{
      name: String,
      productIndex: Number,
      price: Number,
      expressPrice: Number,
      picSrc: String,
      detail: String,
      monthlySales: Number,
      address: String,
      types: [String]
    }]
  }]
}, {
  collection: 'shopTypes'
});

module.exports = mongoose.model('shopTypes', shopTypesSchema);

