import https from "utils/https"

// 获取服务数据
const getServer = data => {
    return https.get('/server', data)
}

// 创建服务
const createServer = data => {
    return https.post('/server', data)
}

// 更新服务状态
const changeStatus = (serverId, data) => {
    return https.patch(`/server/${serverId}/switch`, data)
}

// 修改服务数据
const updateServer = (serverId, data) => {
    return https.put(`/server/${serverId}`, data)
}

// 删除服务数据
const deleteServer = (serverId, data) => {
    return https.delete(`/server/${serverId}`, data)
}

// 删除服务数据
const deleteServers = (data) => {
    return https.DELETE(`/server`, data)
}

// 获取宠物品种
const getVariety = data => {
    return https.get('/variety', data)
}

// 创建宠物品类
const createVariety = data => {
    return https.post('/variety', data)
}

// 更新宠物品类
const updateVariety = (varietyId, data) => {
    return https.put(`/variety/${varietyId}`, data);
}

// 删除单条品类
const delVariety = (id) => {
    return https.DELETE(`/variety/${id}`);
}

// 批量删除品类
const delVarietys = (data) => {
    return https.DELETE(`/variety`, data)
}

export default {
    getServer,
    createServer,
    changeStatus,
    updateServer,
    deleteServer,
    deleteServers,
    getVariety,
    createVariety,
    updateVariety,
    delVariety,
    delVarietys
}