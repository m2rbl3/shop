const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const shops = require('./mock.js')
const loginAndRegisterModel = require('./database/loginAndResiger')
const orderModel = require('./database/order')

/* 获取商店数据 */
const shopList = new Router();
const shopListPath = path.join(__dirname, '../api/shop.json');
shopList.get('/shopList', (ctx, next) => {
  ctx.body = shops;
  next();
});

/* 登陆验证 */
const login = new Router();
login.post('/login', async (ctx, next) => {
  ctx.body = await loginAndRegisterModel.login(ctx.request.body);
  next();
});

/* 注册 */
const register = new Router();
register.post('/register', async (ctx, next) => {
  ctx.body = await loginAndRegisterModel.register(ctx.request.body);
  next();
});

/* 账单 */
const order = new Router();
order.post('/order/upload', async(ctx, next) => {
  ctx.body = await orderModel.upload(ctx.request.body);
  next();
})

order.post('/order/download', async(ctx, next) => {
  ctx.body = await orderModel.download(ctx.request.body);
  next();
});

order.post('/order/delete', async(ctx, next) => {
  ctx.body = await orderModel.delete(ctx.request.body);
  next();
});

/* api */
const api = new Router();
api.use('/api',
  shopList.routes(),
  shopList.allowedMethods(),
  login.routes(),
  login.allowedMethods(),
  register.routes(),
  register.allowedMethods(),
  order.routes(),
  order.allowedMethods()
);

/* app */
app.use(bodyParser());
app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'PUT', 'OPTION', 'POST']
}));
app.use(api.routes(), api.allowedMethods());

app.listen(80, () => {
  console.log('监听成功');
});
