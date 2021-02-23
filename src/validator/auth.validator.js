const {
    validate
} = require('./common');

const register = {
    type: 'object',
    required: ['username', 'password', 'realName'],
    properties: {
        username: {
            type: 'string',
            minLength: 5
        }
    },
    errorMessage: {
        required: {
            username: '用户名不能为空',
            password: '密码不能为空',
            realName: '请填写真实姓名'
        },
        properties: {
            'username': '用户名长度必须为8个及以上',
        }
    }
}

const login = {
    type: 'object',
    required: ['username', 'password', ],
    properties: {
        username: {
            type: 'string',
            minLength: 5
        }
    },
    errorMessage: {
        required: {
            username: '用户名不能为空',
            password: '密码不能为空',
        },
        properties: {
            'username': '用户名长度必须为8个及以上',
        }
    }
}
const registerValidate = (data, key, ctx) => {
    return validate(register, data, ctx);
}

const loginValidate = (data, key, ctx) => {
    return validate(login, data, ctx);
}

module.exports = {
    registerValidate,
    loginValidate
}