const Router = require('koa-router');

const route = new Router({
    prefix: '/user'
});

const {
    genValidator
} = require('../middleware/validate.middleware');
const valdidate = require('../validator/user.validator');

const {
    wxRegister,
    wxLogin
} = require('../controller/user.controller')

route.post('/wxRegister', genValidator(valdidate.wxRes), wxRegister, wxLogin)


module.exports = route