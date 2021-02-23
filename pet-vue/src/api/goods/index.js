import https from "utils/https"

// 获取服务数据
const getMes = data => {
    return https.get('/goods', data)
}

// 编辑商品信息
const updateGoods = (id, data) => {
    return https.put(`/goods/${id}`, data)
}

// 商品上架
const putAway = (id, data) => {
    return https.patch(`/goods/${id}`, data)
}

const getCategoryItem = data => {
    return https.get("/categoryItem/all", data)
}

const getGoodsById = (id, shopId) => {
    return https.get(`/goods/${id}?shopId=` + shopId)
}
// 创建分类
const createGoods = data => {
    return https.post('/goods', data)
}

// 删除单条商品
const deleteGood = data => {
    return https.DELETE(`/goods/${data}`)
}
// 删除多条商品
const deleteGoods = data => {
    return https.DELETE(`/goods`, data)
}
// 删除图片
const deleteImg = id => {
    return https.DELETE(`/upload/${id}`)
}
export default {
    getMes,
    updateGoods,
    createGoods,
    deleteGood,
    deleteGoods,
    getCategoryItem,
    getGoodsById,
    putAway,
    deleteImg
}