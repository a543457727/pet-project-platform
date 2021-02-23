const {
    validate
} = require('./common');

const scheme = {
    type: 'object',
    required: ['name'],
    properties: {
        name: {
            type: 'string',
            minLength: 1
        }
    },
    errorMessage: {
        required: {
            name: '服务种类不能为空',
        },
        properties: {
            name: '服务种类不能为空'
        }
    }
}

const postValidator = (data, key, ctx) => {
    return validate(scheme, data, ctx);
}

module.exports = {
    postValidator
}