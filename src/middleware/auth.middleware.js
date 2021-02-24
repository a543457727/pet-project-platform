const services = require('../services/auth.services')
const errorType = require('../constants/error-types')
const config = require('../app/config')
const axios = require('axios')
const jwt = require('jsonwebtoken');
const {
    PUBLIC_KEY
} = require('../app/config');

// 商家注册 验证是否存在
async function vftAccountExist(ctx, next) {
    const {
        username,
    } = ctx.request.body;
    // 验证用户名或者店铺名是否存在
    const result = await services.checkExist(username);
    if (!result) {
        const error = new Error(errorType.USERNAME_SHOPNAME_EXIST)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

// 验证账号密码
async function vftSignUp(ctx, next) {
    const {
        username,
        password
    } = ctx.request.body
    const result = await services.checkExistByUsername(username, password);
    if (!result) {
        const error = new Error(errorType.USERNAME_OR_PASSWORD_IS_ERROR)
        return ctx.app.emit('error', error, ctx)
    }
    ctx.user = result;
    await next()
}


// 获取用户信息
async function decodeJwt(ctx, next) {
    const authorization = ctx.headers.authorization.replace('Bearer ', "");
    if (!authorization) {
        const error = new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
    try {
        const result = jwt.verify(authorization, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })
        ctx.user = result
        await next()
    } catch (error) {
        ctx.ajaxReturn.code = '401';
        ctx.ajaxReturn.msg = error.message;
        ctx.body = ctx.ajaxReturn
    }
}

async function checkAuth(ctx, next) {
    const resourceName = Object.keys(ctx.params)[0]
    const tableName = resourceName.replace('Id', "");
    const id = ctx.params[resourceName]
    const result = await services.checkAuth(tableName, id)
    if (!result) {
        ctx.ajaxReturn.msg = "传入数据有误"
        return ctx.body = ctx.ajaxReturn
    }
    if (result.parentId != ctx.user.id) {
        const error = new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

async function prepareData(ctx, next) {
    const data = {
        body: ctx.request.body,
        query: ctx.query
    }
    for (let item in data) {
        if (Object.keys(data[item]).length > 0) {
            ctx.data = {
                ...data[item],
                ...ctx.data
            }
        }
    }
    ctx.ajaxReturn = {
        msg: '',
        code: 1,
        data: null
    }
    await next()
}

async function wxLogin(ctx, next) {
    const appId = config.WX_APPID;
    const appsecret = config.WX_APPSecret
    const code = ctx.request.body.code;
    const params = {
        method: "get",
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
    }
    const res = await axios(params)
    if (res.data.errcode) {
        ctx.ajaxReturn.data = res.data;
        return ctx.body = ctx.ajaxReturn
    }
    ctx.user = res.data
    await next()
}

module.exports = {
    vftAccountExist,
    vftSignUp,
    decodeJwt,
    checkAuth,
    prepareData,
    wxLogin
}