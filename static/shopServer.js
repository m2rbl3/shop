var express = require('express');
var path = require('path');

var app = express();
var public = path.resolve(__dirname,"../dist");
var index = path.resolve(__dirname,"../dist","index.html");
app.use(express.static(public));
app.get('/',function(req,res) {
  // res.sendFile(index);
   res.send(true);
});

// var app2 = express();
// var public2 = path.resolve(__dirname,"../src");
// app.use(express.static(public));
// app.get('/',function(req,res) {
//   res.sendFile(index);
// });
app.listen(8070,function(){
  console.log('服务器已开启');
});