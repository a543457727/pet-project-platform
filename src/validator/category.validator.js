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
            name: '分类名称不能为空',
        },
        properties: {
            'name': '分类名称不能为空',
        }
    }
}
const postValidator = (data, key, ctx) => {
    return validate(scheme, data, ctx);
}

module.exports = {
    postValidator,
}