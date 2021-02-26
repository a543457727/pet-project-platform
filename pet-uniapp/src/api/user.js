import https from '@/utils/https'

const wxLogin = (data) => {
    return https.post('/wx/login', data)
}

const wxRegister = data => {
    return https.post('/user/wxRegister', data)
}

const userLogin = data => {
    return https.post('/user/login', data);
}

const userRegister = data => {
    return https.post('/user/register', data);
}

export default {
    wxLogin,
    wxRegister,
    userLogin,
    userRegister
}