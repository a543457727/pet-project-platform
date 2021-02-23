const Router = require('koa-router');
const {
    decodeJwt
} = require('../middleware/auth.middleware');


const {
    checkShopExist,
    checkFieldExist
} = require('../middleware/shop.middleware')
const {
    createShop,
    getPagination,
    upload,
    deleteShop,
    deleteShops
} = require('../controller/shop.controller')
const {
    genValidator
} = require('../middleware/validate.middleware');
const valdidate = require('../validator/shop.validator')


const route = new Router({
    prefix: '/shop'
})
route.post("/", decodeJwt, genValidator(valdidate.postValidate), checkShopExist, createShop)
route.get('/', decodeJwt, getPagination)
route.put('/:shopId', decodeJwt, checkFieldExist, upload)
route.patch('/:shopId', decodeJwt, upload)
route.delete('/:shopId', decodeJwt, deleteShop)
route.delete('/', decodeJwt, deleteShops)

module.exports = route