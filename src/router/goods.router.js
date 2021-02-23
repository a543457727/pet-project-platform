const Router = require('koa-router');
const {
    decodeJwt
} = require('../middleware/auth.middleware');

const {
    genValidator
} = require('../middleware/validate.middleware');

const valdidate = require('../validator/goods.validator')

const {
    checkExist,
    checkFieldExist
} = require('../middleware/goods.middleware')

const {
    create,
    getPagination,
    upload,
    deleteGood,
    deleteGoods,
    getGoodsById
} = require('../controller/goods.controller')


const route = new Router({
    prefix: '/goods'
});

// 创建商品
route.post('/', decodeJwt, genValidator(valdidate.postValidate), checkExist, create);
// 删除商品
route.get('/', decodeJwt, getPagination)
route.get('/:goodsId', decodeJwt, getGoodsById)
route.put('/:goodsId', decodeJwt, genValidator(valdidate.postValidate), checkFieldExist, upload)
route.patch('/:goodsId', decodeJwt, upload)
route.delete('/:goodsId', decodeJwt, deleteGood)
route.delete('/', decodeJwt, deleteGoods)

module.exports = route