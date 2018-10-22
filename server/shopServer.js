const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')
const static = require('koa-static')
const path = require('path')
const fs = require('fs')
// const shops = require('./mock.js')
const loginAndRegisterModel = require('./database/loginAndResiger')
const orderModel = require('./database/order')
const shopModel = require('./database/shop')

const shopPage = new Router();
shopPage.get('/shop', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = fs.readFileSync(path.join(__dirname, '../shop/index.html'));
  await next();
});

const shop = new Router();

/* 获取商店列表 */
shop.get('/shopList', async (ctx, next) => {
  ctx.body = await shopModel.shopList(ctx.request.body);
  await next();
});

/* 搜索 */
shop.get('/search', async (ctx, next) => {
  ctx.body = await shopModel.search(ctx.query);
  await next();
});

/* 获取商店产品类型 */
shop.get('/shop/:shopIndex', async (ctx, next) => {
  await next();
  ctx.body = await shopModel.typesOfShop(ctx.params);
  console.log('获取商店类型成功');
});

/* 获取商店选中类型的产品 */
shop.get('/shop/:shopIndex/:typeIndex', async (ctx, next) => {
  await next();
  ctx.body = await shopModel.chooseTypeProducts(ctx.params);
  console.log('获取商店选中类型商品成功');
});

/* 获取选中产品 */
shop.get('/shop/:shopIndex/:typeIndex/:productIndex', async (ctx,next) => {
  await next();
  ctx.body = await shopModel.chooseProduct(ctx.params);
  console.log('获取选中商品成功')
});

/* 登陆验证 */
const login = new Router();
login.post('/login', async (ctx, next) => {
  await next();
  ctx.body = await loginAndRegisterModel.login(ctx.request.body);
});

/* 注册 */
const register = new Router();
register.post('/register', async (ctx, next) => {
  await next();
  ctx.body = await loginAndRegisterModel.register(ctx.request.body);
});

/* 账单 */
const order = new Router();

/* 上传订单 */
order.post('/order/upload', async(ctx, next) => {
  await next();
  ctx.body = await orderModel.upload(ctx.request.body);
})

/* 获取订单 */
order.post('/order/download', async(ctx, next) => {
  await next();
  ctx.body = await orderModel.download(ctx.request.body);
});

/* 删除订单 */
order.post('/order/delete', async(ctx, next) => {
  await next();
  ctx.body = await orderModel.delete(ctx.request.body);
});

/* api */
const api = new Router();
api.use('/api',
  shop.routes(),
  shop.allowedMethods(),
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

app.use(shopPage.routes(), shopPage.allowedMethods());
app.use(static(path.join(__dirname,'../shop')));
app.use(api.routes(), api.allowedMethods());

app.listen(80, () => {
  console.log('监听成功');
});
