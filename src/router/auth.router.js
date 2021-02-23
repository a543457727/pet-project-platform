const Router = require('koa-router');

const router = new Router();

const {
    vftAccountExist,
    vftSignUp,
    decodeJwt,
    wxLogin
} = require('../middleware/auth.middleware')

const {
    register,
    login,
    md5password,
    getUserInfo,
} = require('../controller/admin.controller')

const {
    getUserInfoByUid
} = require('../controller/user.controller')
const {
    genValidator
} = require('../middleware/validate.middleware');
const valdidate = require('../validator/auth.validator')

// 注册接口
router.post('/register', genValidator(valdidate.registerValidate), vftAccountExist, md5password, register);
// 登录接口
router.post('/login', genValidator(valdidate.loginValidate), md5password, vftSignUp, login);
// 获取用户信息接口
router.get('/userInfo', decodeJwt, getUserInfo);
// 微信登录
router.post('/wx/login', wxLogin, getUserInfoByUid);

module.exports = router