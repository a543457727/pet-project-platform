const Router = require('koa-router');
const {
    decodeJwt
} = require('../middleware/auth.middleware');
const {
    checkExist,
    checkFieldExist
} = require('../middleware/categoryItem.middleware')

const {
    genValidator
} = require('../middleware/validate.middleware');

const valdidate = require('../validator/categoryItem.validate')

const {
    create,
    getPagination,
    upload,
    deleteCategory,
    deleteCategorys,
    getAll,
    getMesByCateId
} = require('../controller/categoryItem.controller')

const route = new Router({
    prefix: '/categoryItem'
});

route.post('/', decodeJwt, genValidator(valdidate.postValidate), checkExist, create)
route.get('/', decodeJwt, getPagination)
route.get('/:categoryId', decodeJwt, getMesByCateId)
route.get('/all', decodeJwt, getAll)
route.put('/:categoryItemId', decodeJwt, genValidator(valdidate.postValidate), checkFieldExist, upload)
route.patch('/:categoryItemId', decodeJwt, upload)
route.delete('/:categoryItemId', decodeJwt, deleteCategory)
route.delete('/', decodeJwt, deleteCategorys)

module.exports = route