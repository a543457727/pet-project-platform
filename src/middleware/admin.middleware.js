const errorType = require('../constants/error-types')

async function checkPermission(ctx, next) {
    if (!ctx.user.ifManage) {
        const error = new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}




module.exports = {
    checkPermission,
}