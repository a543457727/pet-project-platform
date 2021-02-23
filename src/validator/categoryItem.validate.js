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
            name: '二级类目不能为空',
        },
        properties: {
            'name': '二级类目不能为空'
        }
    }
}

const postValidate = (data, key, ctx) => {
    return validate(scheme, data, ctx);
}

module.exports = {
    postValidate
}