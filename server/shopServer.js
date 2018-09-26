const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
const shops = require('./mock.js')
const loginAndRegister = require('./database/loginAndResiger');

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
  const {un, pw} = ctx.request.body;
  ctx.body = await loginAndRegister.login({un, pw});
  next();
});

/* 注册 */
const register = new Router();
register.post('/register', async (ctx, next) => {
  const {un, pw, name} = ctx.request.body;
  ctx.body = await loginAndRegister.register({
    un,
    pw,
    name: name || `user_${Date.now()}`
  });
  next();
});

register.get('/register', async (ctx, next) => {
  ctx.body = ctx;
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
  register.allowedMethods()
);

/* app */
app.use(bodyParser());
app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'PUT', 'OPTION', 'POST']
}));
app.use(api.routes(), api.allowedMethods());

app.listen(80, () => {
  console.log('挂載成功');
});
