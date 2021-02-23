const db = require('../utils/db')

async function uniqueName(params) {
    const result = await db.select('pet_categoryItem', ["*"], params)
    console.log(result);
    return result[0]
}

async function create(params) {
    const result = await db.add('pet_categoryItem', params)
    return result.insertId ? true : false
}

async function pagination(params, page, size) {
    const result = await db.select('pet_categoryItem', ["id", "name", "pictureUrl", "status", "categoryId", "createAt createTime"], params, {
        orderBy: 'createAt',
        sort: 'DESC'
    }, {
        page,
        size
    })
    const count = await db.select('pet_categoryItem', ["COUNT('*') total"], params)
    return result.length ? {
        categoryItems: result,
        total: count[0].total
    } : []
}

async function checkExistByUpload(params, id) {
    const result = await db.select('pet_categoryItem', ['*'], {
        ...params,
        id: ['<>', id]
    })
    return result[0]
}

async function upload(params, where) {
    const result = await db.update('pet_categoryItem', params, where)
    return result.affectedRows ? true : false;
}


async function deleteCategory(id) {
    const result = await db.delete('pet_categoryItem', {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteCategorys(arr) {
    const result = await db.delete('pet_categoryItem', {
        id: ['IN', `(${arr.join(',')})`]
    })
    return result.affectedRows ? true : false;
}

async function getAll(shopId) {
    const result = await db.select('pet_categoryItem', ["id", "name", "pictureUrl", "status", "categoryId", "createAt createTime"], {
        shopId,
        status: 1
    })
    return result.length ? result : []
}
async function getMesByCateId(id, shopId) {
    const result = await db.select('pet_categoryItem', ["*"], {
        categoryId: id,
        shopId
    })
    return result[0] ? result : []
}
module.exports = {
    uniqueName,
    create,
    pagination,
    checkExistByUpload,
    upload,
    deleteCategory,
    deleteCategorys,
    getAll,
    getMesByCateId
}