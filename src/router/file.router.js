const Router = require('koa-router');
const {
    decodeJwt
} = require('../middleware/auth.middleware');

const {
    categoryHandle,
    goodsHandle,
    pictureResize,
    shopHandle,
    avatarHandle
} = require('../middleware/file.middleware')

const {
    sendFilesMes,
    deleteImg
} = require('../controller/file.controller')

const route = new Router({
    prefix: '/upload'
})

route.post('/categoryItem', decodeJwt, categoryHandle, pictureResize, sendFilesMes);
route.post('/goods', decodeJwt, goodsHandle, pictureResize, sendFilesMes)
route.post('/shop', decodeJwt, shopHandle, pictureResize, sendFilesMes)
route.post('/avatar', avatarHandle, sendFilesMes)
route.delete('/:id', decodeJwt, deleteImg)


module.exports = route