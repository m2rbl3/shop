/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-07-29 08:55:02
 * @version $Id$
 */
var express = require('express');
var app = express();
app.get("/",function(req,res){
  res.send(req.ip);
 });

app.listen(8060,function(){
  console.log('fuck');
});
// self.addEventListener('message',function(e){
//     var data=e.data;
//     // self.postMessage(data+'吃屎');
//     throw "韩九啦起头";
//     self.close();
// });
