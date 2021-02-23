const {
    validate
} = require('./common');

const scheme = {
    type: 'object',
    required: ['name', 'avatar'],
    properties: {
        shopName: {
            type: 'string',
            minLength: 1
        }
    },
    errorMessage: {
        required: {
            name: '服务名称不能为空',
            avatar: '请上传头像'
        },
        properties: {
            name: '服务名称不能为空'
        }
    }
}

const postValidate = (data, key, ctx) => {
    return validate(scheme, data, ctx);
}

module.exports = {
    postValidate
}