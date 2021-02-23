const Router = require('koa-router');
const {
    decodeJwt,
    checkAuth
} = require('../middleware/auth.middleware');
const {
    checkFields,
    checkExistByUpload
} = require('../middleware/server.middleware');
const {
    createServerType,
    getPagination,
    uploadServer,
    deleteServer,
    uploadStatus,
    deleteServers
} = require('../controller/server.controller');


const {
    genValidator
} = require('../middleware/validate.middleware');
const valdidate = require('../validator/server.validator')

const router = new Router({
    prefix: '/server'
});

// 创建服务
router.post('/', decodeJwt, genValidator(valdidate.postValidate), checkFields, createServerType);
// 获取服务-分页
router.get('/', decodeJwt, getPagination);
// 修改服务
router.put('/:serverId', decodeJwt, genValidator(valdidate.postValidate), checkExistByUpload, uploadServer);
// 删除单条服务
router.delete('/:serverId', decodeJwt, deleteServer);
// 删除多条服务
router.delete('/', decodeJwt, deleteServers);
// 修改服务状态
router.patch('/:serverId/switch', decodeJwt, uploadStatus);

module.exports = router