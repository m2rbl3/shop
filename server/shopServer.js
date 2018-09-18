const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const shops = require('./mock.js')

const shopList = new Router();
const shopListPath = path.join(__dirname,'../api/shop.json');

async function cors(ctx,next) {
  ctx.set('Access-Control-Allow-Origin','*');
  ctx.set('Access-Control-Allow-Methods','PUT,GET,POST,OPTIONS');
}

shopList.get('/shopList',async (ctx,next) => {
  // ctx.body = await fs.readFileSync(shopListPath,'utf-8');
  ctx.body = shops;
});
const login = new Router();

login.use(bodyParser());
login.post('/login',ctx => {

  ctx.body = true;
});


const api = new Router();
api.use('/api',cors(),shopList.routes(),shopList.allowedMethods());

// const cube = new Router();
// const cubePath = path.join(__dirname,'../cube');
// cube.use('/cube',static(path.join(__dirname,cubePath))).get('/cube',async ctx=>{
//     ctx.body = 'Hello World';
// });

app.use(api.routes(),api.allowedMethods())/*.use(cube.routes(),cube.allowedMethods())*/;
app.listen(80,()=>{
  console.log('成功');
});