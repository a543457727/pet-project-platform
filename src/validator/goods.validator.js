const {
    validate
} = require('./common');

const scheme = {
    type: 'object',
    required: ['name', 'shopId', 'price', 'categoryItemId'],
    properties: {
        name: {
            type: 'string',
            minLength: 1
        },
        categoryItemId: {
            type: 'integer',
            minimum: 0
        }
    },
    errorMessage: {
        required: {
            name: '商品名称不能为空',
            price: '商品价格不能为空',
            shopId: '请先选择上传店铺',
            categoryItemId: '请选择二级类目'
        },
        properties: {
            name: '商品名称不能为空',
            categoryItemId: '请选择二级类目'
        }
    }
}

const postValidate = (data, key, ctx) => {
    return validate(scheme, data, ctx);
}

module.exports = {
    postValidate
}