import https from "utils/https"

// 获取服务数据
const getMes = data => {
    return https.get('/category', data)
}

// 更新分类启用状态
const updateStatus = data => {
    return https.patch(`/category/${data.id}`, data)
}

// 创建分类
const createCategory = data => {
    return https.post('/category', data)
}

// 编辑分类
const updateCategory = data => {
    return https.put(`/category/${data.id}`, data)
}

// 删除单条分类
const deleteCategory = data => {
    return https.DELETE(`/category/${data}`)
}
// 删除单条分类
const deleteCategorys = data => {
    return https.DELETE(`/category`, data)
}

export default {
    getMes,
    updateStatus,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteCategorys
}