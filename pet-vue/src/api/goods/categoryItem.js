import https from "utils/https"

// 获取服务数据
const getCategory = id => {
    return https.get('/category/all?shopId=' + id)
}
const getMes = data => {

    return https.get('/categoryItem', data)
}

// 更新分类启用状态
const updateStatus = data => {
    return https.patch(`/category/${data.id}`, data)
}

// 创建分类
const createCategoryItem = data => {
    return https.post('/categoryItem', data)
}

// 编辑分类
const updateCategoryItem = data => {
    return https.put(`/categoryitem/${data.id}`, data)
}

// 删除单条分类
const deleteCategoryItem = data => {
    return https.DELETE(`/categoryItem/${data}`)
}
// 删除单条分类
const deleteCategoryItems = data => {
    return https.DELETE(`/categoryItem`, data)
}

export default {
    getCategory,
    getMes,
    createCategoryItem,
    updateStatus,
    updateCategoryItem,
    deleteCategoryItem,
    deleteCategoryItems
}