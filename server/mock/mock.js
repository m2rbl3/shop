const Mock = require('mockjs')
const path = require('path')
const fs = require('fs')

function sendMockData(filePath) {
  return Mock.mock(JSON.parse(fs.readFileSync(filePath,'utf-8')));
}

module.exports = sendMockData(path.join(__dirname,'./shop.json'));