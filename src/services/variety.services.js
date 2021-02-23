const db = require('../utils/db');

// 检测类别名称是否存在
async function checkExist(params) {
    const result = await db.select('pet_variety', ['*'], params)
    return result[0]
}

async function checkExistByUpload(params, id) {
    const result = await db.select('pet_variety', ['*'], {
        ...params,
        id: ['<>', id]
    })
    return result[0]
}

async function createVariety(params) {
    const result = await db.add('pet_variety', params)
    return result.insertId ? true : false
}

async function pagination(params, page, size) {
    const result = await db.select('pet_variety', ["id", "name", "smallWeight", "bigWeight", "createAt createTime"], params, {
        orderBy: 'createAt',
        sort: 'DESC'
    }, {
        page,
        size
    })
    const count = await db.select('pet_variety', ["COUNT('*') total"], params)
    return result.length ? {
        varietys: result,
        total: count[0].total
    } : []
}

async function uploadVariety(params, id) {
    const result = await db.update('pet_variety', params, {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteVariety(id) {
    const result = await db.delete('pet_variety', {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteVarietys(arr, id) {
    const result = await db.delete('pet_variety', {
        id: ['IN', `(${arr.join(',')})`],
        shopId: id
    })
    return result.affectedRows ? true : false;
}

module.exports = {
    checkExist,
    createVariety,
    pagination,
    uploadVariety,
    checkExistByUpload,
    deleteVariety,
    deleteVarietys
}