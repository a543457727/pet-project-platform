const {
    validate
} = require('./common');

const wxRegister = {
    type: 'object',
    required: ['uid', 'password', 'nick', 'phone', 'avatar'],
    properties: {
        uid: {
            type: 'string',
            minLength: 1
        },
        password: {
            type: 'string',
            minLength: 1
        },
        nick: {
            type: 'string',
            minLength: 1
        },
        avatar: {
            type: 'string',
            minLength: 1
        },
    },
    errorMessage: {
        required: {
            uid: 'uid不能为空',
            avatar: '请上传头像',
            password: '请输入正确的密码',
            nick: '请输入昵称',
            phone: '请输入手机号',
        },
        properties: {
            uid: '非法进入',
            avatar: '请上传头像',
            password: '请输入正确的密码',
            nick: '请输入昵称',
            phone: '请输入手机号',
        }
    }
}

const userLogin = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        username: {
            type: 'string',
            minLength: 1
        },
        password: {
            type: 'string',
            minLength: 1
        }
    },
    errorMessage: {
        required: {
            username: '服务名称不能为空',
            password: '密码不能为空'
        },
        properties: {
            username: '服务名称不能为空',
            password: '密码不能为空'
        }
    }
}

const userRegister = {
    type: 'object',
    required: ['username', 'password', "nick", "avatar"],
    properties: {
        username: {
            type: 'string',
            minLength: 1
        },
        password: {
            type: 'string',
            minLength: 1
        },
        nick: {
            type: 'string',
            minLength: 1
        },
        avatar: {
            type: 'string',
            minLength: 1
        }
    },
    errorMessage: {
        required: {
            username: '服务名称不能为空',
            password: '密码不能为空',
            nick: '昵称不能为空',
            avatar: '头像不能为空'
        },
        properties: {
            username: '服务名称不能为空',
            password: '密码不能为空',
            nick: '昵称不能为空',
            avatar: '头像不能为空'
        }
    }
}


const wxRes = (data, key, ctx) => {
    return validate(wxRegister, data, ctx);
}

const Login = (data, key, ctx) => {
    return validate(userLogin, data, ctx);
}

const register = (data, key, ctx) => {
    return validate(userRegister, data, ctx);
}


module.exports = {
    wxRes,
    Login,
    register
}