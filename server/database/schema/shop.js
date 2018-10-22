const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shopID: Schema.Types.ObjectId,
  name: String,
  shopIndex: Number,
  picSrc: String
}, {
  collection: 'shops'
});

module.exports = mongoose.model('shops', shopSchema);