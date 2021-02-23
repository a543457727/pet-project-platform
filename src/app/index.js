const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const routeUse = require('../router/index')
const errorHandle = require('../app/error-handle');
const static = require('koa-static')
const path = require('path')


// 解决跨域问题
const cors = require('koa2-cors');
// 数据整合
const {
    prepareData
} = require('../middleware/auth.middleware')


const app = new Koa()

app.use(static(path.resolve(__dirname, '../../public')))
app.routeUse = routeUse;
app.use(cors())
app.use(bodyParser())
app.use(prepareData)
app.routeUse();
app.on('error', errorHandle)

module.exports = app