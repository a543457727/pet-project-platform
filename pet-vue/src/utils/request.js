import axios from 'axios';
// import router from "../router"
// import {
//     showLoading,
//     hideLoading
// } from 'components/loading';

const network = axios.create({
    baseURL: 'http://127.0.0.1:8888',
    timeout: 60000
})

network.interceptors.request.use(config => {
    // showLoading()
    if (config.url != '/login') {
        config.headers.authorization = localStorage.getItem('token')
    }
    return config
}, error => {
    Promise.reject(error)
})

network.interceptors.response.use(response => {
    // hideLoading()
    return response.data
}, error => {
    // hideLoading()
    return Promise.reject(error)
})



export default {
    network,
}