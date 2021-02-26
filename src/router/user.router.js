const Router = require('koa-router');

const route = new Router({
    prefix: '/user'
});

const {
    checkUserExist,
    checkUsername
} = require('../middleware/user.middleware')
const {
    genValidator
} = require('../middleware/validate.middleware');
const valdidate = require('../validator/user.validator');

const {
    wxRegister,
    wxLogin,
    userLogin,
    register
} = require('../controller/user.controller');
const {
    md5password
} = require('../controller/admin.controller');

route.post('/wxRegister', genValidator(valdidate.wxRes), wxRegister, wxLogin)

route.post('/login', genValidator(valdidate.Login), checkUserExist, md5password, userLogin)

route.post('/register', genValidator(valdidate.register), checkUsername, md5password, register)


module.exports = route