const Router = require('koa-router');

const {
    decodeJwt
} = require('../middleware/auth.middleware')


const {
    checkField,
    checkFieldExist
} = require('../middleware/category.middleware')

const {
    create,
    getPagination,
    upload,
    uploadStatus,
    deleteCategory,
    deleteCategorys,
    getAll
} = require('../controller/category.controller');

const {
    genValidator
} = require('../middleware/validate.middleware');
const valdidate = require('../validator/server.validator')


const route = new Router({
    prefix: '/category'
})

// 创建商品分类
route.post('/', decodeJwt, genValidator(valdidate.postValidate), checkField, create)
route.get('/', decodeJwt, getPagination)
route.get('/all', decodeJwt, getAll)
route.put('/:categoryId', decodeJwt, genValidator(valdidate.postValidate), checkFieldExist, upload)
route.patch('/:categoryId', decodeJwt, uploadStatus)
route.delete('/:categoryId', decodeJwt, deleteCategory)
route.delete('/', decodeJwt, deleteCategorys)

module.exports = route