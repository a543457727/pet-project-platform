import https from "utils/https"

// 注册
const getMes = data => {
    return https.get('/shop', data)
}

const addShop = data => {
    return https.post('/shop', data)
}

const changeStatus = data => {
    return https.patch(`/shop/${data.id}`, data)
}

const updateShop = data => {
    return https.put(`/shop/${data.id}`, data)
}

const deleteShop = id => {
    return https.DELETE(`/shop/${id}`)
}

const deleteShops = data => {
    return https.DELETE(`/shop`, data)
}
export default {
    getMes,
    addShop,
    changeStatus,
    updateShop,
    deleteShop,
    deleteShops
}