const services = require('../services/user.services')

class UserController {
    async getUserInfoByUid(ctx) {
        const uid = ctx.user.openid;
        console.log(9999, uid);
        const result = await services.existByUid(uid);
        console.log(result);
        if (result) {
            const token = jwt.sign(Object.assign({}, result), config.PRIVATE_KEY, {
                expiresIn: 60 * 60 * 24,
                algorithm: 'RS256'
            })
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = "用户登录成功";
            ctx.ajaxReturn.data = {
                token
            }
        } else {
            ctx.ajaxReturn.msg = "首次登录,请先完善信息";
            ctx.ajaxReturn.code = 2;
            ctx.ajaxReturn.data = ctx.user;
        }
        ctx.body = ctx.ajaxReturn
    }
}

module.exports = new UserController()