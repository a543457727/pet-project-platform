import https from '@/utils/https'

const wxLogin = (data) => {
    return https.post('/wx/login', data)
}

const wxRegister = data => {
    return https.post('/user/wxRegister', data)
}

export default {
    wxLogin,
    wxRegister
}