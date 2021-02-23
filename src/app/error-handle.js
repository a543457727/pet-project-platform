const errorTypes = require('../constants/error-types');

const errorhandle = (error, ctx) => {
    let ajaxReturn = {
        code: 1,
        msg: '',
        data: null
    }
    switch (error.message) {
        case errorTypes.USERNAME_SHOPNAME_EXIST:
            ajaxReturn.msg = '用户名或店名已被注册'
            break;
        case errorTypes.DATA_IS_NOT_NULL:
            ajaxReturn.msg = '填写数据有误'
            break;
        case errorTypes.USERNAME_PASSWORD_IS_NULL:
            ajaxReturn.msg = "用户名密码不能为空";
            break;
        case errorTypes.USERNAME_OR_PASSWORD_IS_ERROR:
            ajaxReturn.msg = "用户名密码错误";
            break;
        case errorTypes.PASSWORD_IS_ERROR:
            ajaxReturn.msg = "密码错误"
            break;
        case errorTypes.UNPERMISSION:
            ajaxReturn.msg = "没有权限"
            break;
        case errorTypes.FIELD_IS_NOT_NULL:
            ajaxReturn.msg = "字段不能为空"
            break;
        case errorTypes.SERVERNAME_IS_EXIST:
            ajaxReturn.msg = "服务名称已经存在"
            break;
        case errorTypes.GOODSCATEGORY_IS_EXIST:
            ajaxReturn.msg = "商品类别已经存在"
            break;
        case errorTypes.GOOD_IS_EXIST:
            ajaxReturn.msg = '该商品名称已存在';
        case errorTypes.SHOP_IS_EXIST:
            ajaxReturn.msg = '店铺已经存在'
    }
    ctx.body = ajaxReturn
}

module.exports = errorhandle