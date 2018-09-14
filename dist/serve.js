const express = require('express')
const app = express();

// const public = path.resolve(__dirname,"../dist");
// const index = path.resolve(__dirname,"../dist","index.html");

app.use(express.static(__dirname));
app.post('/login',function(req,res){
  res.header("Access-Control-Allow-Origin", '*');
  res.send(true);
})

app.listen(8060,function(){
  console.log('监听成功');
});