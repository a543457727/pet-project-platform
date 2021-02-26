const services = require('../services/user.services')
const errorType = require('../constants/error-types')

// 检查店铺名称是否存在
async function checkUserExist(ctx, next) {
    const username = ctx.request.body.username;
    const result = await services.checkUserExist(username)
    if (!result) {
        const error = new Error(errorType.USER_IS_NOT_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

async function checkUsername(ctx, next) {
    const username = ctx.request.body.username;
    const result = await services.checkUserExist(username)
    if (result) {
        const error = new Error(errorType.USERNAME_IS_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

module.exports = {
    checkUserExist,
    checkUsername
}