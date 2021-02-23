const services = require('../services/admin.services');
const jwt = require('jsonwebtoken');
const config = require('../app/config')
const md5 = require('../utils/md5password')

class AdminController {
    async register(ctx, next) {
        const adminInfo = ctx.request.body
        const result = await services.register(adminInfo)
        ctx.ajaxReturn.code = result ? 0 : 1
        ctx.ajaxReturn.msg = result ? '注册成功' : "创建错误"
        ctx.body = ctx.ajaxReturn
    }
    // 用户登录
    async login(ctx) {
        const token = jwt.sign(Object.assign({}, ctx.user), config.PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        ctx.ajaxReturn.code = 0;
        ctx.ajaxReturn.msg = "用户登录成功";
        ctx.ajaxReturn.data = {
            token
        }
        ctx.body = ctx.ajaxReturn
    }
    // 密码加密
    async md5password(ctx, next) {
        ctx.request.body.password = md5(ctx.request.body.password);
        await next()
    }
    // 获取用户信息
    async getUserInfo(ctx, next) {
        const result = await services.getShop(ctx.user.id);
        ctx.user.shop = result
        ctx.body = ctx.user
    }
}
module.exports = new AdminController()