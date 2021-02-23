const db = require('../utils/db');
const path = require('path')

// 检测服务名称是否存在
async function checkExist(params) {
    const result = await db.select('pet_goods', ['*'], params)
    return result[0]
}

// 创建商品
async function create(params) {
    const result = await db.add('pet_goods', params)
    return result.insertId ? result.insertId : false
}

// 获取数据
async function pagination(params, page, size) {
    const result = await db.select('pet_goods',
        ["id", "name", "flag", "price", "stock", "`desc`", "categoryItemId", "shopId", "createAt createTime"],
        params, {
            orderBy: 'createAt',
            sort: 'DESC'
        }, {
            page,
            size
        })
    const count = await db.select('pet_goods', ["COUNT('*') total"], params);
    for (let i = 0; i <= result.length - 1; i++) {
        const res = await db.select('pet_goodsImg', ['id', 'largeImg', 'smallImg', 'middleImg', 'artworkImg'], {
            goodId: result[i]['id']
        })
        result[i].pictures = res[0] ? res : [];
    }
    return result.length ? {
        goods: result,
        total: count[0].total
    } : [];
}

async function checkExistByUpload(params, id) {
    const result = await db.select('pet_goods', ['*'], {
        ...params,
        id: ['<>', id]
    })
    return result[0]
}

async function upload(params, where) {
    const result = await db.update('pet_goods', params, where)
    return result.affectedRows ? true : false;
}

async function deleteGood(id) {
    const result = await db.delete('pet_goods', {
        id
    })
    return result.affectedRows ? true : false;
}

async function deleteGoods(arr) {
    const result = await db.delete('pet_goods', {
        id: ['IN', `(${arr.join(',')})`]
    })
    return result.affectedRows ? true : false;
}

async function getGoodsById(id, shopId) {
    const result = await db.select('pet_goods', ['*'], {
        id,
        shopId
    })
    if (result[0]) {
        const pictures = await db.select('pet_goodsImg', ['id', 'largeImg', 'smallImg', 'middleImg', 'artworkImg url'], {
            goodId: result[0]['id']
        })
        console.log('picture', pictures);
        result[0].pictureUrl = pictures[0] ? pictures : []
    }
    return result.length ? result : [];
}

function saveImg(imgGroup, goodId) {
    imgGroup.forEach(async item => {
        const extName = path.extname(item);
        const fileName = item.replace(extName, '')
        const largeImg = `${fileName}-large${extName}`
        const middleImg = `${fileName}-middle${extName}`
        const smallImg = `${fileName}-small${extName}`
        const artworkImg = `${item}`;
        const result = await db.add('pet_goodsImg', {
            largeImg,
            middleImg,
            smallImg,
            artworkImg,
            goodId
        })
    });
}
module.exports = {
    checkExist,
    create,
    pagination,
    checkExistByUpload,
    upload,
    deleteGood,
    deleteGoods,
    getGoodsById,
    saveImg
}