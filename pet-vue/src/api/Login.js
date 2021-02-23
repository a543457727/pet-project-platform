import https from "utils/https"

// 注册
const register = data => {
    return https.post('/register', data)
}

// 登录
const signUp = data => {
    return https.post('/login', data)
}

// 获取用户信息
const getUserInfo = data => {
    return https.get('/userInfo', data)
}

export default {
    register,
    signUp,
    getUserInfo
}