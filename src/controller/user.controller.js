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
    // 微信登录
    async wxLogin(ctx) {
        const info = ctx.user
        const token = jwt(Object.assign({}, info), ctx);
        ctx.ajaxReturn.code = 0;
        ctx.ajaxReturn.msg = "登录成功";
        ctx.ajaxReturn.data = {
            token
        }
        ctx.body = ctx.ajaxReturn
    }
    // 用户登录
    async userLogin(ctx) {
        const data = ctx.request.body;
        const result = await services.vtfUser(data);
        if (result) {
            const token = jwt(Object.assign({}, result), ctx);
            ctx.ajaxReturn.data = {
                token
            }
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = '登录成功'
        } else {
            ctx.ajaxReturn.msg = '账号密码错误'
        }
        ctx.body = ctx.ajaxReturn
    }
    // 注册
    async register(ctx) {
        const data = ctx.request.body
        const result = await services.register(data);
        if (!result) {
            ctx.ajaxReturn.msg = "账号注册失败,请检查信息"
        } else {
            ctx.ajaxReturn.code = 0;
            ctx.ajaxReturn.msg = "账号注册成功"
        }
        ctx.body = ctx.ajaxReturn
    }
}

module.exports = new UserController()