const db = require('../utils/db');

// 检测类别名称是否存在
async function checkExist(params) {
    const result = await db.select('pet_category', ['*'], params)
    return result[0]
}

async function checkExistByUpload(params, id) {
    const result = await db.select('pet_category', ['*'], {
        ...params,
        id: ['<>', id]
    })
    return result[0]
}

async function create(params) {
    const result = await db.add('pet_category', params)
    return result.insertId ? true : false

}

async function pagination(params, page, size) {
    const result = await db.select('pet_category', ["id", "name", "status", "createAt createTime"], params, {
        orderBy: 'createAt',
        sort: 'DESC'
    }, (page && size) ? {
        page,
        size
    } : null)
    const count = await db.select('pet_category', ["COUNT('*') total"], params)
    return result.length ? {
        categorys: result,
        total: count[0].total
    } : []
}

async function upload(name, id) {
    const result = await db.update('pet_category', {
        name
    }, {
        id
    })
    return result.affectedRows ? true : false;
}

async function uploadStatus(status, id) {
    const result = await db.update('pet_category', {
        status
    }, {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteCategory(id) {
    const result = await db.delete('pet_category', {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteCategorys(arr) {
    const result = await db.delete('pet_category', {
        id: ['IN', `(${arr.join(',')})`]
    })
    return result.affectedRows ? true : false;
}

async function getAll(shopId) {
    const result = await db.select('pet_category', ["id", "name", "status", "createAt createTime"], {
        shopId,
        status: 1
    })
    return result.length ? result : []
}


module.exports = {
    checkExist,
    create,
    pagination,
    checkExistByUpload,
    upload,
    uploadStatus,
    deleteCategory,
    deleteCategorys,
    getAll
}