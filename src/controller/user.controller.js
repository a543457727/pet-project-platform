const services = require('../services/user.services')
const errorType = require('../constants/error-types')
const jwt = require('../utils/jwt');

class UserController {
    async getUserInfoByUid(ctx, next) {
        const uid = ctx.user.openid;
        const result = await services.existByUid(uid);
        if (result) {
            ctx.user = result;
            return await next();
        } else {
            ctx.ajaxReturn.msg = "首次登录,请先完善信息";
            ctx.ajaxReturn.code = 2;
            ctx.ajaxReturn.data = ctx.user;
        }
        ctx.body = ctx.ajaxReturn
    }
    async wxRegister(ctx, next) {
        const data = ctx.request.body;
        const id = await services.wxRegister(data)
        if (!id) {
            const error = new Error(errorType.WX_CREATE_ERROR)
            return ctx.app.emit('error', error, ctx)
        }
        const userInfo = await services.getUserInfoByUid(id);
        if (!userInfo) {
            return ctx.body = "网络错误,请稍后再试"
        }
        ctx.user = userInfo;
        await next()
    }
    async wxLogin(ctx) {
        const info = ctx.user
        const token = jwt(Object.assign({}, info));
        ctx.ajaxReturn.code = 0;
        ctx.ajaxReturn.msg = "登录成功";
        ctx.ajaxReturn.data = {
            token
        }
        ctx.body = ctx.ajaxReturn
    }
}

module.exports = new UserController()