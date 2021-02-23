import https from '@/utils/https'

const wxLogin = (data) => {
    return https.post('/wx/login', data)
}

export default {
    wxLogin
}