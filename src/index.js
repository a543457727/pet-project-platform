const app = require('./app/index')
const config = require('./app/config')
require('./app/database')

app.listen(config.APP_PORT, () => {
    console.log(`服务器启动成功,请打开网址:http://127.0.0.1:${config.APP_PORT}`);
})