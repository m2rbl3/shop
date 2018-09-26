const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  UserId: ObjectId,
  name: {
    unique: true,
    type: String
  },
  un: {
    unique: true,
    type: String
  },
  pw: {
    unique: true,
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('user', userSchema);
