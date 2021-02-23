const Router = require('koa-router');
const {
    createVariety,
    getPagination,
    uploadVariety,
    deleteVariety,
    deleteVarietys
} = require('../controller/variety.controller');
const {
    decodeJwt
} = require('../middleware/auth.middleware');
const {
    checkFields,
    checkExistByUpload
} = require('../middleware/variety.middleware');


const {
    genValidator
} = require('../middleware/validate.middleware');
const valdidate = require('../validator/variety.validator');

const router = new Router({
    prefix: '/variety'
});

// 创建宠物品类
router.post('/', decodeJwt, genValidator(valdidate.postValidator), checkFields, createVariety);
// 获取服务-分页
router.get('/', decodeJwt, getPagination);
// 修改服务
router.put('/:varietyId', decodeJwt, genValidator(valdidate.postValidator), checkExistByUpload, uploadVariety);
// 删除
router.delete('/:varietyId', decodeJwt, deleteVariety);
router.delete('/', decodeJwt, deleteVarietys);

module.exports = router